
module myapp {

    class Descriptor {

    }

/*
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
    */
   export class Charc {
        characteristicUuid: string;
        name: string;
        descriptors: any[];
        properties: any;
        getId(): string {
            return this.characteristicUuid;
        }      
        constructor(obj: any,constants:any) {
            this.characteristicUuid =  obj.characteristicUuid
            this.name = constants[this.characteristicUuid];            
            this.descriptors = obj.descriptors;
            this.properties = obj.properties;
        }
    }


  export  class Service {
        private SERVICE:string;
        private CONFIG:string;
        private PERIOD:string;
        private DATA: string;
        private NOTIFICATION: string;
        private CALIBRATION: string;
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
                    chr[id] = new Charc(chars[i],name);
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

    export class Service1 {
        serviceUuid: string;
        characteristics: any;
        name: string;
        charcs: Charc[];
        getId(): string {
            return this.serviceUuid;
        }

       
        constructor(private obj: any, constants: any) {
            var charcs: any[] = obj.characteristics;           
            var uuid: string = obj.serviceUuid;
            if (!uuid || !charcs) {
                console.log('ERROR no properties serviceUuid or characteristics');
                return;
            }
            this.serviceUuid = uuid;
            this.name = constants[uuid];
            var out: Charc[] = [];
            if (!this.name) console.log('UNKNOWN service ' + uuid);
            for (var i = 0, n = charcs.length; i < n; i++) {               
                var charc: Charc = new Charc(charcs[i], constants);
                out.push(charc);
                if (!charc.name) console.log('UNKNOWN name for characteristicUuid: ' + charc.getId() + ' in Service: ' + this.name);
            }
            this.charcs = out;

        }
    }
    export class TheDevice {
        private servs: Service1[]
       address:string

       

        constructor(obj:any, constants: any) {
            this.address = obj.address;
            var ar: any[] = obj.services;
        var srs: Service1[] = [];
        for (var i = 0, n = ar.length; i < n; i++)     srs.push(new Service1(ar[i], constants));
       
            this.servs = srs;
        }
           
       
        getServices(): Service1[]{
            return this.servs;         
        }

    }

}

