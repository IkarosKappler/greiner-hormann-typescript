(function() {

    var HK = [22.2670, 114.188],
        zoom = 18,
        source = [
            [22.26722012682322, 114.18723821640015],
            [22.267458416642448, 114.18765127658844],
            [22.267537846492015, 114.18758153915405],
            [22.26769670605589, 114.18786585330963],
            [22.26700665851556, 114.1885095834732],
            [22.26687758449714, 114.18863832950592],
            [22.26659461411705, 114.1888153553009],
            [22.26637618044986, 114.18890118598938],
            [22.266247105849885, 114.18857932090759],
            [22.26647546852267, 114.18868660926819],
            [22.266813047443286, 114.18798387050629],
            [22.26715558992735, 114.18765664100646],
            [22.26701162289852, 114.18736696243286],
            [22.26722012682322, 114.18723821640015]
        ],
        clip = [
            [22.266574756525035, 114.18707728385925],
            [22.26637618044986, 114.18727576732635],
            [22.266693902034877, 114.187570810318],
            [22.266718724003326, 114.18762981891632],
            [22.2665846853214, 114.18781220912933],
            [22.266435753301998, 114.18817162513733],
            [22.26687758449714, 114.18833792209625],
            [22.26690737081966, 114.18824672698975],
            [22.266788225491567, 114.18818771839142],
            [22.26680808305329, 114.18814480304718],
            [22.26687758449714, 114.18817698955536],
            [22.26689247765919, 114.18813407421112],
            [22.266952050291525, 114.18818235397339],
            [22.266991765365663, 114.18812334537506],
            [22.266862691333507, 114.18804824352264],
            [22.26701162289852, 114.18795168399811],
            [22.26718041181389, 114.18813407421112],
            [22.26696694344565, 114.18835937976837],
            [22.267016587281276, 114.18842375278473],
            [22.26739387985647, 114.18805897235869],
            [22.267061266718283, 114.18762445449829],
            [22.26695701467642, 114.18740451335907],
            [22.26690240643301, 114.18745815753937],
            [22.266574756525035, 114.18707728385925]
        ],
        sourceStyle = {
            weight: 2
        },
        clipStyle = {
            weight: 2,
            color: '#f48'
        },
        resultStyle = {
            weight: 3,
            color: '#f00'
        };

    function displayMap(container, center, zoom) {
        var map = L.map(container, {
                scrollWheelZoom: false
            })
            .setView(center, zoom);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' +
                '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }

    function showResult(polygons, map) {
        if (typeof polygons[0][0] === 'number') {
            polygons = [polygons];
        }
        for (var i = 0, len = polygons.length; i < len; i++) {
            L.polygon(polygons[i], resultStyle).addTo(map);
        }
    }


    // intersection
    (function() {
        var intersectionMap = displayMap('intersection-map', HK, zoom),
            sourcePolygon = L.polygon(source, sourceStyle).addTo(intersectionMap),
            clipPolygon = L.polygon(clip, clipStyle).addTo(intersectionMap);

        var result = greinerHormann.intersection(sourcePolygon, clipPolygon);
        showResult(result, intersectionMap);
    })();

    // union
    (function() {
        var unionMap = displayMap('union-map', HK, zoom),
            sourcePolygon = L.polygon(source, sourceStyle).addTo(unionMap),
            clipPolygon = L.polygon(clip, clipStyle).addTo(unionMap);

        var result = greinerHormann.union(sourcePolygon, clipPolygon);
        showResult(result, unionMap);
    })();

    // union
    (function() {
        var diffMap = displayMap('diff-map', HK, zoom),
            sourcePolygon = L.polygon(source, sourceStyle).addTo(diffMap),
            clipPolygon = L.polygon(clip, clipStyle).addTo(diffMap);

        var result = greinerHormann.diff(sourcePolygon, clipPolygon);
        showResult(result, diffMap);
    })();

})();
