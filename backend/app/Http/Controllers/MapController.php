<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MapController extends Controller
{
    public const EARTH_RADIUS = 6371; // km

    /***
     * Check the status of the API
     * @return JsonResponse|string[]
     */
    public function info()
    {
        return [
            'name' => 'Map',
            'version' => '1.0.0',
            'author' => 'maxoralbay',
            'email' => 'code.datum@gmail.com'
        ];
    }

    /***
     * @param $deg
     * @return float|int
     */
    public function deg2rad($deg)
    {
        return $deg * (pi() / 180);
    }

    /***
     * The endpoint will receive 3 points (latitude and longitude) and will return the centroid of the triangle and
     * the distance between the centroid and each point.
     * @param Request $request
     * @return JsonResponse|string[]
     */
    public function calcTriangulate(Request $request)
    {
        // get latitudes and longitudes
        //Point 1
        $lat1 = $request->latitude1;
        $lon1 = $request->longitude1;
        //Point 2
        $lat2 = $request->latitude2;
        $lon2 = $request->longitude2;
        //Point 3
        $lat3 = $request->latitude3;
        $lon3 = $request->longitude3;
        Log::debug('request calcTriangulate', [
            'lat1' => $lat1,
            'lon1' => $lon1,
            'lat2' => $lat2,
            'lon2' => $lon2,
            'lat3' => $lat3,
            'lon3' => $lon3,
        ]);
        // calculate the centroid of the triangle
        $centroid = $this->getCentroid($lat1, $lon1, $lat2, $lon2, $lat3, $lon3);
        // calculate the distance between use calcDistance method
        $distance1 = $this->calcDistance($centroid['lat'], $centroid['lng'], $lat1, $lon1);
        $distance2 = $this->calcDistance($centroid['lat'], $centroid['lng'], $lat2, $lon2);
        $distance3 = $this->calcDistance($centroid['lat'], $centroid['lng'], $lat3, $lon3);
        Log::debug('calcTriangulate', [
            'centroid' => $centroid,
            'distance1' => $distance1,
            'distance2' => $distance2,
            'distance3' => $distance3,
        ]);

        return [
            'centroid' => $centroid,
            'distance1' => $distance1,
            'distance2' => $distance2,
            'distance3' => $distance3,
        ];

    }

    public function getCentroid($lat1, $lon1, $lat2, $lon2, $lat3, $lon3)
    {
        $centroid = [];
        $centroid['lat'] = ($lat1 + $lat2 + $lat3) / 3;
        $centroid['lng'] = ($lon1 + $lon2 + $lon3) / 3;
        return $centroid;
    }

    /***
     * ‘haversine’ formula to calculate the great-circle distance between two points – that is the shortest distance
     *  over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points.
     * @param Request $request
     * @return JsonResponse|string[]
     */
    public function calcDistance($lat1, $lon1, $lat2, $lon2)
    {
        $dlat = $this->deg2rad($lat2 - $lat1);
        $dlon = $this->deg2rad($lon2 - $lon1);
        $a = sin($dlat / 2) * sin($dlat / 2) + cos($this->deg2rad($lat1)) * cos($this->deg2rad($lat2)) * sin($dlon / 2) * sin($dlon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return self::EARTH_RADIUS * $c;
    }


}
