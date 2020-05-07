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
            }
            else {
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
            SubwayMap.toggleLine(line.id);

            for (let station of HTML.stationsOf(line.id)) {
                if(SubwayMap.isLineSelected(line.id))
                    HTML.display.stationSelected(station);
                else
                    HTML.display.stationNotSelected(station);
            }
        }
    }
}