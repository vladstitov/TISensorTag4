/// <reference path="constants.ts" />



module myapp {

    class Service {
        private SERVICE:string;
        private CONFIG:string;
        private PERIOD:string;
        private DATA: string;
        private NOTIFICATION: string;
        private chars: any;
        getId(): string {
            return this.SERVICE;
        }
        isSensor(): boolean {
            return this.type === 1;
        }
        isInput(): boolean {
            return this.type === 2;
        }
        isOther(): boolean {
            return this.type === 3;
        }

        initService(chars: any): boolean {
            if (!this.chars) {
                this.chars = chars;
                console.log(this.name + ' got Chars: ');
                console.log(chars);
                console.log('My chars: ');
                console.log(this.obj);

                return true;
            } else return false;
        }
        constructor(private obj: any,public name:string,public type:number) {
            for (var str in obj) {
                var val = obj[str];
                this[str] = val;
                this[val] = str;
            }
        }
    }

    export class TheDevice {
        private servs: BleService[]
        private constants: any;

        private sensorTypes: any;
        private inputs: any;
        private others: any;

        constructor(constants:any) {
           
            var types: any = {}
            for (var str in constants.SENSORS) {
                var serv: Service = new Service(constants.SENSORS[str], str,1);
                types[serv.getId()] = serv;
            }
            for (var str in constants.INPUTS) {
                var serv: Service = new Service(constants.INPUTS[str], str, 2);
                types[serv.getId()] = serv;
            }
            for (var str in constants.OTHERS) {                
                var serv: Service = new Service({ SERVICE: constants.OTHERS[str] }, str, 3);
                types[serv.getId()] = serv;
            }
            this.sensorTypes = types;      
            this.constants = constants;
            console.log('The Device types: ', types);
        }

       private getSeviceById(id: string): Service {
            return this.sensorTypes[id];
        }

        private addService(obj:any): void {
            var uuid: string = obj.serviceUuid;
            if (uuid) {
                var ser: Service = this.getSeviceById(uuid);
                if (ser) {
                    if (ser.initService(obj.characteristics)) {
                        console.log('Service initialized ' + ser.name);

                    } else console.log('ERROR duplicate service ' + uuid,obj);
                }
                    
            }
            
        }
        setServices(ar: any[]): VoChars[] {
            var out: BleService[] = [];
            var chars: VoChars[] = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                this.addService(ar[i]);               

               // var serv: BleService  = new BleService(ar[i])
               // out.push(serv);
              // chars = chars.concat(serv.getAllChars());
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

