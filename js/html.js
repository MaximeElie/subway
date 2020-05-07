class HTML {

    static stations() {
        return document.getElementById("stations").children;
    }

    static lines() {
        return document.getElementById("lines").children;
    }

    static stationsOf(lineId) {
        return document.getElementsByClassName(lineId);
    }

    static stationFromEvent(event) {
        let element = event.target;

        while (element.parentElement.id != "stations")
            element = element.parentElement;

        return element;
    }

    static lineFromEvent(event) {
        let element = event.target;

        while (element.parentElement.id != "lines")
            element = element.parentElement;

        return element;
    }

    static display = class {

        static stationHover(station) {
            for (let circle of station.getElementsByClassName("underground_map_widget-circle-FQ9ukpHC")) {
                if(circle.previousElementSibling != null)
                    return;
                let color = circle.getAttribute("stroke");
                let html = '<circle cy="0" cx="0" r="5.5" fill="' + color + '" stroke="' + color + '" filter="url(#metroStationBlur)" opacity="0.4"></circle>';
                circle.parentElement.innerHTML = html + circle.parentElement.innerHTML;
            }
            for (let text of station.getElementsByClassName("underground_map_widget-station_name-nzuArteK")) {
                text.setAttribute("class", "underground_map_widget-station_name-nzuArteK underground_map_widget-station_name--hover-GWgnPYHa");
            }
        }
        
        static stationNotHover(station) {    
            for (let circle of station.getElementsByClassName("underground_map_widget-circle-FQ9ukpHC")) {
                if(circle.previousElementSibling == null)
                    return;
                circle.parentElement.removeChild(circle.previousElementSibling);
            }
            for (let text of station.getElementsByClassName("underground_map_widget-station_name-nzuArteK")) {
                text.setAttribute("class", "underground_map_widget-station_name-nzuArteK");
            }
        }
        
        static stationSelected(station) {
            for (let circle of station.getElementsByClassName("underground_map_widget-circle-FQ9ukpHC")) {
                circle.parentElement.setAttribute("class", "underground_map_widget-selected_station-mEHkTAAi");
                var html = '<circle cy="0" cx="0" r="6.75" stroke="#ff7f00"></circle>';
                html += '<polyline points="-3 0.2 -1 2.2 3 -1.8"></polyline>';
                circle.parentElement.innerHTML += html;
            }
            for (let text of station.getElementsByClassName("underground_map_widget-station_name-nzuArteK")) {
                text.previousElementSibling.setAttribute("class", "underground_map_widget-selected-LAnsGaX6");
            }
        }
        
        static stationNotSelected(station) {
            for (let circle of station.getElementsByClassName("underground_map_widget-circle-FQ9ukpHC")) {
                circle.parentElement.setAttribute("class", "");
                circle.parentElement.removeChild(circle.nextElementSibling);
                circle.parentElement.removeChild(circle.nextElementSibling);
            }
            for (let text of station.getElementsByClassName("underground_map_widget-station_name-nzuArteK")) {
                text.previousElementSibling.setAttribute("class", "");
            }
        }
    }
}