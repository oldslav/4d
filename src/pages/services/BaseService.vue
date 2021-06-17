<template lang="pug">
  div
    BaseMap(:data="parkingData")
    router-view
</template>

<script>
  import BaseMap from "../../components/common/BaseMap";
  export default {
    name: "BaseService",
    components: { BaseMap },
    created () {
      this.prepareParkingData();
    },
    data () {
      return {
        parkingData: null
      };
    },
    methods: {
      prepareParkingData () {
        const { type, features } = {
          type: "FeatureCollection",
          features: [
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7437945342503,
                        55.7482230806449
                      ],
                      [
                        48.744429659338,
                        55.7489209186584
                      ],
                      [
                        48.7450349937016,
                        55.7487463988864
                      ],
                      [
                        48.7443998686138,
                        55.7480485577513
                      ],
                      [
                        48.7437945342503,
                        55.7482230806449
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 120\", \"subtitle\" : \"ID: 10000031 \"}",
                "total": 67,
                "images": [
                  "/uploads/categories/parking/20000087.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 120",
                "busy": 45,
                "name": "Парковка 120 дома",
                "parking_places_type": "Обычное",
                "free": 22,
                "parking_type": "Подземные частные"
              },
              "id": "1"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7417795498073,
                        55.7475876962349
                      ],
                      [
                        48.7424108083005,
                        55.7482812971958
                      ],
                      [
                        48.7430148309797,
                        55.7481071527323
                      ],
                      [
                        48.7423835724865,
                        55.7474135486754
                      ],
                      [
                        48.7417795498073,
                        55.7475876962349
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 110\", \"subtitle\" : \"ID: 10000022 \"}",
                "total": 67,
                "images": [
                  "/uploads/categories/parking/20000086.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 110",
                "busy": 43,
                "name": "Парковка 110 дома",
                "parking_places_type": "Обычное",
                "free": 24,
                "parking_type": "Подземные частные"
              },
              "id": "10"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7417795498073,
                        55.7475876962349
                      ],
                      [
                        48.7423835724865,
                        55.7474135486754
                      ],
                      [
                        48.7421740973663,
                        55.7471833822462
                      ],
                      [
                        48.741570074687,
                        55.747357530833
                      ],
                      [
                        48.7417795498073,
                        55.7475876962349
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 102\", \"subtitle\" : \"ID: 10000020 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000085.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 102",
                "busy": 5,
                "name": "Парковка 102 дома",
                "parking_places_type": "Льготное",
                "free": 29,
                "parking_type": "Подземные частные"
              },
              "id": "11"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7426698426758,
                        55.7470240999634
                      ],
                      [
                        48.7433049677636,
                        55.7477219594228
                      ],
                      [
                        48.7439103021271,
                        55.7475474342875
                      ],
                      [
                        48.7432751770394,
                        55.7468495717063
                      ],
                      [
                        48.7426698426758,
                        55.7470240999634
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 104\", \"subtitle\" : \"ID: 10000023 \"}",
                "total": 67,
                "images": [
                  "/uploads/categories/parking/20000082.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 104",
                "busy": 44,
                "name": "Парковка 104 дома",
                "parking_places_type": "Обычное",
                "free": 23,
                "parking_type": "Подземные частные"
              },
              "id": "12"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7433049677636,
                        55.7477219594228
                      ],
                      [
                        48.7435101570733,
                        55.7479474136037
                      ],
                      [
                        48.7441154914369,
                        55.7477728894769
                      ],
                      [
                        48.7439103021271,
                        55.7475474342875
                      ],
                      [
                        48.7433049677636,
                        55.7477219594228
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 112\", \"subtitle\" : \"ID: 10000029 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000081.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 112",
                "busy": 8,
                "name": "Парковка 112 дома",
                "parking_places_type": "Льготное",
                "free": 26,
                "parking_type": "Подземные частные"
              },
              "id": "13"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7434842329437,
                        55.7470792794775
                      ],
                      [
                        48.7441154914369,
                        55.7477728894769
                      ],
                      [
                        48.7447195141162,
                        55.7475987427441
                      ],
                      [
                        48.744088255623,
                        55.7469051296486
                      ],
                      [
                        48.7434842329437,
                        55.7470792794775
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 114\", \"subtitle\" : \"ID: 10000032 \"}",
                "total": 68,
                "images": [
                  "/uploads/categories/parking/20000079.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 114",
                "busy": 34,
                "name": "Парковка 114 дома",
                "parking_places_type": "Обычное",
                "free": 34,
                "parking_type": "Подземные частные"
              },
              "id": "14"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7434842329437,
                        55.7470792794775
                      ],
                      [
                        48.744088255623,
                        55.7469051296486
                      ],
                      [
                        48.7438787805027,
                        55.74667496022
                      ],
                      [
                        48.7432747578235,
                        55.7468491110762
                      ],
                      [
                        48.7434842329437,
                        55.7470792794775
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 106\", \"subtitle\" : \"ID: 10000030 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000080.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 106",
                "busy": 27,
                "name": "Парковка 106 дома",
                "parking_places_type": "Льготное",
                "free": 7,
                "parking_type": "Подземные частные"
              },
              "id": "15"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7439971819698,
                        55.7508242897625
                      ],
                      [
                        48.7451841864448,
                        55.7504925369266
                      ],
                      [
                        48.7443692140543,
                        55.7495600357951
                      ],
                      [
                        48.7431717327628,
                        55.7498933136987
                      ],
                      [
                        48.7439971819698,
                        55.7508242897625
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 138\", \"subtitle\" : \"ID: 10000080 \"}",
                "total": 226,
                "images": [
                  "/uploads/categories/parking/20000037_2.JPG",
                  "/uploads/categories/parking/20000037_3.JPG",
                  "/uploads/categories/parking/20000037_4.JPG",
                  "/uploads/categories/parking/20000037_1.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 138",
                "busy": 226,
                "name": "Парковка домов 138, 140, 142",
                "parking_places_type": "Обычное",
                "free": 0,
                "parking_type": "Наземные частные"
              },
              "id": "16"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7457800742679,
                        55.7503318364954
                      ],
                      [
                        48.7449595718148,
                        55.7493954729631
                      ],
                      [
                        48.7460849144463,
                        55.7490719100391
                      ],
                      [
                        48.7469195619403,
                        55.7500153470085
                      ],
                      [
                        48.7457800742679,
                        55.7503318364954
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 132\", \"subtitle\" : \"ID: 10000077 \"}",
                "total": 226,
                "images": [
                  "/uploads/categories/parking/20000036_2.JPG",
                  "/uploads/categories/parking/20000036_4.JPG",
                  "/uploads/categories/parking/20000036_1.JPG",
                  "/uploads/categories/parking/0000036_3.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 132",
                "busy": 226,
                "name": "Парковка домов 132, 134, 136",
                "parking_places_type": "Обычное",
                "free": 0,
                "parking_type": "Наземные частные"
              },
              "id": "17"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.744429659338,
                        55.7489209186584
                      ],
                      [
                        48.7446348486478,
                        55.7491463659108
                      ],
                      [
                        48.7452401830114,
                        55.7489718471473
                      ],
                      [
                        48.7450349937016,
                        55.7487463988864
                      ],
                      [
                        48.744429659338,
                        55.7489209186584
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 128\", \"subtitle\" : \"ID: 10000034 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000088.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 128",
                "busy": 14,
                "name": "Парковка 128 дома",
                "parking_places_type": "Льготное",
                "free": 20,
                "parking_type": "Подземные частные"
              },
              "id": "2"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7446089245182,
                        55.7482782584633
                      ],
                      [
                        48.7452129471974,
                        55.7481041139862
                      ],
                      [
                        48.7450034720772,
                        55.7478739516309
                      ],
                      [
                        48.7443994493979,
                        55.7480480971353
                      ],
                      [
                        48.7446089245182,
                        55.7482782584633
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 122\", \"subtitle\" : \"ID: 10000037 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000089.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 122",
                "busy": 26,
                "name": "Парковка 122 дома",
                "parking_places_type": "Обычное",
                "free": 8,
                "parking_type": "Подземные частные"
              },
              "id": "3"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7420999528677,
                        55.748730836915
                      ],
                      [
                        48.7427350779554,
                        55.7494286658462
                      ],
                      [
                        48.743340412319,
                        55.7492541483456
                      ],
                      [
                        48.7427052872313,
                        55.7485563162927
                      ],
                      [
                        48.7420999528677,
                        55.748730836915
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 116\", \"subtitle\" : \"ID: 10000021 \"}",
                "total": 68,
                "images": [
                  "/uploads/categories/parking/20000091.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 116",
                "busy": 41,
                "name": "Парковка 116 дома",
                "parking_places_type": "Обычное",
                "free": 27,
                "parking_type": "Подземные частные"
              },
              "id": "4"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7427350779554,
                        55.7494286658462
                      ],
                      [
                        48.7429402672652,
                        55.7496541101644
                      ],
                      [
                        48.7435456016288,
                        55.7494795936723
                      ],
                      [
                        48.743340412319,
                        55.7492541483456
                      ],
                      [
                        48.7427350779554,
                        55.7494286658462
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 124\", \"subtitle\" : \"ID: 10000025 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000092.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 124",
                "busy": 5,
                "name": "Парковка 124 дома",
                "parking_places_type": "Льготное",
                "free": 29,
                "parking_type": "Подземные частные"
              },
              "id": "5"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7429143431356,
                        55.7487860140152
                      ],
                      [
                        48.7435456016288,
                        55.7494795936723
                      ],
                      [
                        48.744149624308,
                        55.7493054545576
                      ],
                      [
                        48.7435183658148,
                        55.7486118718046
                      ],
                      [
                        48.7429143431356,
                        55.7487860140152
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 126\", \"subtitle\" : \"ID: 10000028 \"}",
                "total": 68,
                "images": [
                  "/uploads/categories/parking/20000094.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 126",
                "busy": 42,
                "name": "Парковка 126 дома",
                "parking_places_type": "Обычное",
                "free": 26,
                "parking_type": "Подземные частные"
              },
              "id": "6"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7429143431356,
                        55.7487860140152
                      ],
                      [
                        48.7435183658148,
                        55.7486118718046
                      ],
                      [
                        48.7433088906946,
                        55.7483817124448
                      ],
                      [
                        48.7427048680153,
                        55.7485558556828
                      ],
                      [
                        48.7429143431356,
                        55.7487860140152
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 118\", \"subtitle\" : \"ID: 10000027 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000093.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 118",
                "busy": 1,
                "name": "Парковка 118 дома",
                "parking_places_type": "Льготное",
                "free": 33,
                "parking_type": "Подземные частные"
              },
              "id": "7"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7409651595394,
                        55.7475325174398
                      ],
                      [
                        48.7416002846271,
                        55.7482303678054
                      ],
                      [
                        48.7422056189907,
                        55.7480558449443
                      ],
                      [
                        48.7415704939029,
                        55.7473579914571
                      ],
                      [
                        48.7409651595394,
                        55.7475325174398
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 100\", \"subtitle\" : \"ID: 10000010 \"}",
                "total": 68,
                "images": [
                  "/uploads/categories/parking/20000083.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 100",
                "busy": 29,
                "name": "Парковка 100 дома",
                "parking_places_type": "Обычное",
                "free": 39,
                "parking_type": "Подземные частные"
              },
              "id": "8"
            },
            {
              "type": "Feature",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [
                        48.7416002846271,
                        55.7482303678054
                      ],
                      [
                        48.7418054739369,
                        55.7484558190483
                      ],
                      [
                        48.7424108083005,
                        55.7482812971958
                      ],
                      [
                        48.7422056189907,
                        55.7480558449443
                      ],
                      [
                        48.7416002846271,
                        55.7482303678054
                      ]
                    ]
                  ]
                ]
              },
              "properties": {
                "hover": "{\"title\" : \"Многоквартирный жилой дом, ул. Спортивная, дом 108\", \"subtitle\" : \"ID: 10000017 \"}",
                "total": 34,
                "images": [
                  "/uploads/categories/parking/20000084.JPG"
                ],
                "legend": "Многоквартирный жилой дом, ул. Спортивная, дом 108",
                "busy": 4,
                "name": "Парковка 108 дома",
                "parking_places_type": "Льготное",
                "free": 30,
                "parking_type": "Подземные частные"
              },
              "id": "9"
            }
          ]
        };

        this.parkingData = {
          type,
          features: features.map(i => {
            if (!i.properties.free) {
              i.properties.fill = "#FF6565";
            } else if (i.properties.parking_places_type === "Обычное") {
              i.properties.fill = "#84D197";
            } else if (i.properties.parking_places_type === "Льготное") {
              i.properties.fill = "#298BAF";
            }

            Object.assign(i.properties, {
              stroke: "#333333"
            });

            return i;
          })
        };
      }
    }
  };
</script>

<style scoped>

</style>
