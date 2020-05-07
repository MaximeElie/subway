class Events {

    static addListeners() {
        for (let element of HTML.stations()) {
            element.addEventListener("mouseenter", this.handlers.mouseEnterStation);
            element.addEventListener("mouseleave", this.handlers.mouseLeaveStation);
            element.addEventListener("click", this.handlers.clickStation);
        }
        for (let element of HTML.lines()) {
            element.addEventListener("mouseenter", this.handlers.mouseEnterLine);
            element.addEventListener("mouseleave", this.handlers.mouseLeaveLine);
            element.addEventListener("click", this.handlers.clickLine);
        }
        HTML.postButton().addEventListener("click", this.handlers.clickPostButton);
    }

    static handlers = class {

        static mouseEnterStation(event) {
            HTML.display.stationHover(HTML.stationFromEvent(event));
        }

        static mouseLeaveStation(event) {
            HTML.display.stationNotHover(HTML.stationFromEvent(event));
        }

        static clickStation(event) {
            let station = HTML.stationFromEvent(event);

            if (!SubwayMap.isStationSelected(station.id)) {
                SubwayMap.selectStation(station.id);
                HTML.display.stationSelected(station);
            } else {
                SubwayMap.deselectStation(station.id);
                HTML.display.stationNotSelected(station);
            }
        }

        static mouseEnterLine(event) {
            let line = HTML.lineFromEvent(event);
            for (let station of HTML.stationsOf(line.id))
                HTML.display.stationHover(station);
        }

        static mouseLeaveLine(event) {
            let line = HTML.lineFromEvent(event);
            for (let station of HTML.stationsOf(line.id))
                HTML.display.stationNotHover(station);
        }

        static clickLine(event) {
            let line = HTML.lineFromEvent(event);
            let isLineSelected = SubwayMap.isLineSelected(line.id);

            for (let station of HTML.stationsOf(line.id)) {
                if (isLineSelected) {
                    SubwayMap.deselectStation(station.id);
                    HTML.display.stationNotSelected(station);
                } else if (!SubwayMap.isStationSelected(station.id)) {
                    SubwayMap.selectStation(station.id);
                    HTML.display.stationSelected(station);
                }
            }
        }

        static clickPostButton(event) {
            let request = new XMLHttpRequest();

            request.onload = function() { HTML.responseText().textContent = this.responseText; };
            request.open("POST", "http://77.238.128.166:8111/subway_selected");
            request.setRequestHeader("Content-Type", "application/json");

            let map = new Map();
            map.set("stations", SubwayMap.selectedStationsNames());
            request.send(JSON.stringify(Object.fromEntries(map)));

            console.log(request);
        }
    }
}