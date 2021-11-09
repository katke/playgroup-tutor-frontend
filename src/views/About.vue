<template>
  <main id="main">
    <div class="row">
      <div id="info" class="container d-flex flex-column align-items-center" data-aos="zoom-down">
        <a href="javascript:history.back()" class="btn btn-about">Go Back</a>
      </div>
    </div>
    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>About Playgroup Tutor</h2>
        </div>

        <div class="row">
          <div class="col-lg-7 pt-4 pt-lg-0 content">
            <h3>Who? What? Why??</h3>
            <section id="resume" class="resume">
              <div class="resume-item pb-0">
                <h4>Me</h4>
                <p>
                  Hello! My name is David Ryan and I built this site's frontend (display) and backend (database) from
                  scratch. I utilized themes, Bootstrap, and other components that people have made to fully customize
                  how this site works and how you can interact with it. I made this site because I wanted a way for
                  people who play Magic: the Gathering to connect.
                </p>
                <br />
              </div>
              <div class="resume-item pb-0">
                <h4>Context</h4>
                <p>
                  A "tutor" in Magic: the Gathering is a nickname for cards that let you find another card of your
                  choice from your deck. Hense, Playgroup Tutor lets you find a playgroup or just friends!
                </p>
                <br />
              </div>
              <div class="resume-item pb-0">
                <h4>Tools</h4>

                <p>
                  I use several APIs, most importantly 'Turf' to find the distance between two points. This allows users
                  to filter their search results to people who are as close to them as they wish. The other important
                  API is the 'Scryfall' API. That lets me search for any of the 20,000+ unique Magic cards for their art
                  (and other info). Below is another API that I've utilized - 'Mapbox'. This is just a neat way of
                  showing where all my users are.
                </p>
              </div>
            </section>
          </div>
          <div class="col-lg-5">
            <div class="ro">
              <img src="assets/img/idyllic-tutor.jpeg" class="img-fluid" alt="" />
              <p class="fst-italic float-end">Idyllic Tutor, Illustrated by Jaime Jones</p>
            </div>
            <div class="ro">
              <img src="assets/img/vamp-tutor.jpeg" class="img-fluid" alt="" />
              <p class="fst-italic float-end">Vampiric Tutor, Illustrated by Lucas Graciano</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="section-title">
            <br />
            <hr />
            <br />
            <h2>User Heatmap</h2>
          </div>
          <div id="map"></div>
          <div class="row">
            <div class="container d-flex flex-column align-items-center" data-aos="fade-up">
              <a href="javascript:history.back()" class="btn btn-about">Back</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
#map {
  /* width: 500px; */
  height: 500px;
}
</style>

<script>
/* global mapboxgl, mapboxSdk */
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
      position: [-12.554729, -55.70651],
      places: [
        { address: "merchandise mart", description: "A place in Australia" },
        { address: "60067", description: "?????" },
      ],
      userLocations: {
        type: "FeatureCollection",
        crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        features: [],
      },
    };
  },
  mounted() {
    this.importUsers();
  },
  methods: {
    importUsers: function () {
      axios.get("/users").then((response) => {
        this.users = response.data;
        this.users.forEach((user) => {
          this.userLocations.features.push({
            type: "Feature",
            properties: { id: user.id, mag: 1, time: 1507425650893, felt: null, tsunami: 0 },
            geometry: { type: "Point", coordinates: [user.longitude, user.latitude, 0.0] },
          });
        });
        // console.log("features", this.userLocations.features);
        setTimeout(() => {
          this.createMap();
        }, 50);
      });
    },
    createMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_API_KEY;

      const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-88.931726, 40.478418], // starting position [lng, lat]
        zoom: 5, // starting zoom
      });

      map.on("load", () => {
        // Add a geojson point source.
        // Heatmap layers also work with a vector tile source.
        map.addSource("earthquakes", {
          type: "geojson",
          // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
          data: this.userLocations,
        });

        map.addLayer(
          {
            id: "earthquakes-heat",
            type: "heatmap",
            source: "earthquakes",
            maxzoom: 9,
            paint: {
              // Increase the heatmap weight based on frequency and property magnitude
              "heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 1, 1],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(33,102,172,0)",
                0.2,
                "rgb(103,169,207)",
                0.4,
                "rgb(209,229,240)",
                0.6,
                "rgb(253,219,199)",
                0.8,
                "rgb(239,138,98)",
                1,
                "rgb(178,24,43)",
              ],
              // Adjust the heatmap radius by zoom level
              "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
              // Transition from heatmap to circle layer by zoom level
              "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
            },
          },
          "waterway-label"
        );

        map.addLayer(
          {
            id: "earthquakes-point",
            type: "circle",
            source: "earthquakes",
            minzoom: 7,
            paint: {
              // Size circle radius by earthquake magnitude and zoom level
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7,
                ["interpolate", ["linear"], ["get", "mag"], 1, 1, 6, 4],
                16,
                ["interpolate", ["linear"], ["get", "mag"], 1, 5, 6, 50],
              ],
              // Color circle by earthquake magnitude
              "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1,
                "rgba(33,102,172,0)",
                2,
                "rgb(103,169,207)",
                3,
                "rgb(209,229,240)",
                4,
                "rgb(253,219,199)",
                5,
                "rgb(239,138,98)",
                6,
                "rgb(178,24,43)",
              ],
              "circle-stroke-color": "white",
              "circle-stroke-width": 1,
              // Transition from heatmap to circle layer by zoom level
              "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
            },
          },
          "waterway-label"
        );
      });

      this.places.forEach((location) => {
        // const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.description);
        // new mapboxgl.Marker().setLngLat([location.lng, location.lat]).setPopup(popup).addTo(map);
        mapboxClient.geocoding
          .forwardGeocode({
            query: location.address,
            autocomplete: false,
            limit: 1,
          })
          .send()
          .then((response) => {
            if (!response || !response.body || !response.body.features || !response.body.features.length) {
              console.error("Invalid response:");
              console.error(response);
              return;
            }
            // const feature = response.body.features[0];
            // console.log(feature);

            // Create a marker and add it to the map.
            // const popup = new mapboxgl.Popup({ offset: 25 }).setText(location.description);
            // new mapboxgl.Marker().setLngLat(feature.center).setPopup(popup).addTo(map);
            // console.log(map);
          });
      });

      // map.addControl(
      //   ne({
      //     accessToken: mapboxgl.accessToken,
      //   }),
      //   "top-left"
      // );
    },
  },
};
</script>
