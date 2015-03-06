module myapp {
    export class ViewData {
        value: string;
        parameters: string;
    }

        

    export class SensorBase {
        service:TheService
        constructor(public view: JQuery, private connector: ble.BLEConnector, service: myapp.TheService) {
            this.service = service;
           this.init();
        }

        start(): void {

        }

        stop(): void {

        }

        init(): void {

        }
    }

    export class IRTemperature extends SensorBase { 
         
        init(): void {
            var chars: Charc[] = this.service.getCharacteristics();
            for (var i = 0, n = chars.length; i < n; i++) {
                var ch: Charc = chars[i];
                console.log(ch.name);
                console.log(ch.properties);
                 }
        }
              
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

        initUI(view: JQuery): void {

        }

    }
    export class Pressure extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Humidity extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Magnetometer extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Accelerometer extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Barometer extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }

    export class Gyroscope extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Inputs extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Generic extends SensorBase {
        view: JQuery
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
}