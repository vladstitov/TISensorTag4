module myapp {
    export class BleServices {
        private servs:BleService[]
        constructor() {
            console.log('BleServices');
        }

        setServices(ar: any[]): VoChars[] {
            var out: BleService[] = [];
            var chars: VoChars[] = [];
            for (var i = 0, n = ar.length; i < n; i++) {

                var serv: BleService  = new BleService(ar[i])
                out.push(serv);
               chars = chars.concat(serv.getAllChars());
            }
            this.servs = out;
            return chars;
        }

    }



    export class BleService {
        serviceUuid: string;
        characteristics: VoChars[];

        constructor(obj: any) {
            var id = obj.serviceUuid;
            this.serviceUuid = id;
            var ar: any = obj.characteristics;
            var out:VoChars[]=[]
            for (var i = 0, n = ar.length; i < n; i++) {
                out.push(new VoChars(ar[i],id));
            }

            this.characteristics = out;
        }

        getAllChars(): VoChars[] {
            return this.characteristics;
        }


    }

    export class VoChars {
        public serviceUuid: string;
        constructor(obj: any, serviceUuid: string) {
            this.serviceUuid = serviceUuid;
            for (var str in obj) this[str] = obj[str];
    }
    }
}

