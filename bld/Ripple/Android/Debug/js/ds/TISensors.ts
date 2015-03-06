module tisensor {
    export class ViewData {
        value: string;
        parameters: string;
    }
    export interface ParseData {
        parse: (rawData:any) => ViewData;
        incode: (data: any) => any;
    }
    export class IRTemperature implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Pressure implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Humidity implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Magnetometer implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Accelerometer implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Barometer implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }

    export class Gyroscope implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Inputs implements ParseData {
        parse(rawData: any): ViewData {
            var out: ViewData = new ViewData;
            return out;
        }
        incode(data: any): any {
            var out: any = {};
            return out;
        }

    }
    export class Generic implements ParseData {
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