/// <reference path="constants.ts" />



module myapp {

    class Descriptor {

    }


    class Chars {
        characteristicUuid: string;
        descriptors: any[];
        properties: any;
        read: boolean = false;
        write: boolean=false;
        notify: boolean=false;
        private descrs: string[];
        constructor(obj: any, name: string) {          

            for (var str in obj) { this[str] = obj[str] }
            if (obj.descriptors) {
                var ar:string[] = [];
                for (var i = 0, n = obj.descriptors.length; i < n; i++)ar.push(obj.descriptors[i].descriptorUuid);
                this.descrs = ar;
            }

            if (obj.properties) for (var str in obj.properties) this[str] = obj.properties[str];
           
        }
    }


    class Service {
        private SERVICE:string;
        private CONFIG:string;
        private PERIOD:string;
        private DATA: string;
        private NOTIFICATION: string;
        private chars: any;
        private characteristics: any;
        private known: {};
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

        initService(obj: any): boolean {
            var chars: any[] =obj.characteristics
            if (!this.chars) {
                this.characteristics = chars;
                var chr = {};
                var kn = this.known;
                for (var i = 0, n = chars.length; i < n; i++) {
                    var id: string = chars[i].characteristicUuid;
                    var name: string = kn[id];
                    if (!name) console.log('Unknown from device characteristic of: '+this.name +' '+ id );
                    chr[id] = new Chars(chars[i],name);
                }
                this.chars = chr;
               // console.log(this.name + ' got Chars: ');
               // console.log(chars);
               // console.log('My chars: ');
               // console.log(this.obj);

                return true;
            } else return false;
        }
        constructor(private obj: any, public name: string, public type: number) {
            var kn: any = {};
            for (var str in obj) {
                var val = obj[str];
                this[str] = val;
                kn[val] = str;
            }
            this.known = kn;
        }
    }

    export class TheDevice {
        private servs: Service[]
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

        getSeviceById(id: string): Service {
            return this.sensorTypes[id];
        }

        private addService(obj:any):Service {
            var uuid: string = obj.serviceUuid;
            if (uuid) {
                var ser: Service = this.getSeviceById(uuid);
                if (ser) {
                    if (ser.initService(obj)) {
                        console.log('Service initialized ' + ser.name);
                        return ser;
                    } else console.log('ERROR duplicate service ' + uuid,obj);
                }
                    
            }
            return null;
        }
        setServices(ar: any[]): Service[] {           
            var srs:Service[] = [];
            for (var i = 0, n = ar.length; i < n; i++) {
                srs.push(this.addService(ar[i]));              
            }
            this.servs = srs;
            return srs;
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

