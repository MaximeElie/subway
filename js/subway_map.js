class SubwayMap {

    static stationsSelected = new Map();

    static isStationSelected(stationId) {
        if (!this.stationsSelected.has(stationId))
            this.stationsSelected.set(stationId, false);

        return this.stationsSelected.get(stationId);
    }

    static isLineSelected(lineId) {
        for (let station of HTML.stationsOf(lineId)) {
            if (!this.isStationSelected(station.id))
                return false;
        }

        return true;
    }

    static selectStation(stationId) {
        if (this.isStationSelected(stationId))
            return;

        this.stationsSelected.set(stationId, true);
    }

    static deselectStation(stationId) {
        if (!this.isStationSelected(stationId))
            return;

        this.stationsSelected.set(stationId, false);
    }

    static toggleLine(lineId) {
        let isLineSelected = this.isLineSelected(lineId);

        for (let station of HTML.stationsOf(lineId)) {
            if (isLineSelected)
                this.deselectStation(station.id);
            else
                this.selectStation(station.id);
        }
    }

    static selectedStationsNames() {
        let names = [];
        for (let i of this.stationsSelected)
            names.push(HTML.stationName(i[0]));

        return names;
    }
}