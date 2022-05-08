

function loadMapScenario() {
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        /* No need to set credentials if already passed in URL */
        center: new Microsoft.Maps.Location(47.606209, -122.332071),
        zoom: 12
    });
    var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});

    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
        var directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
        if (directionsManager.getAllWaypoints().length < 2) {
            directionsManager.clearAll();
            var seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: 'Seattle, WA' });
            directionsManager.addWaypoint(seattleWaypoint);
            var tacomaWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: 'Tacoma, WA', location: new Microsoft.Maps.Location(47.255134, -122.441650) });
            directionsManager.addWaypoint(tacomaWaypoint);
        }
        // Insert a waypoint
        directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ address: 'Issaquah, WA', location: new Microsoft.Maps.Location(47.530094, -122.033798) }), 1);
        // Set the element in which the itinerary will be rendered
        directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
        directionsManager.calculateDirections();
    });
    //Drawing
    Microsoft.Maps.loadModule('Microsoft.Maps.DrawingTools', function () {
        var tools = new Microsoft.Maps.DrawingTools(map);
        tools.showDrawingManager(function (manager) {
            printText('Drawing manager loaded.');
            Microsoft.Maps.Events.addHandler(manager, 'drawingStarted', function () { printText('Drawing started.'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingEnded', function () { printText('Drawing ended.'); });
            Microsoft.Maps.Events.addHandler(manager, 'drawingErased', function () { printText('Drawing erased.'); });
        });
    });
    
}
function printText(text) {
    var panel = document.getElementById('printoutPanel');
    if (panel && text) {
        var line = document.createElement('div');
        line.appendChild(document.createTextNode(text));
        panel.appendChild(line);
    }
}