
module myapp {

    class Descriptor {

    }


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

    export class TheService {
        serviceUuid: string;
        characteristics: any;
        name: string;
        charcs: Charc[];
        getId(): string {
            return this.serviceUuid;
        }

        getCharacteristics(): Charc[] {
            return this.charcs;
        }
       
        constructor(obj: any, constants: any) {           
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
        private servs: TheService[]
        address:string 
       constructor(obj: any, constants: any) {
            this.address = obj.address;
            var ar: any[] = obj.services;
        var srs: TheService[] = [];
        for (var i = 0, n = ar.length; i < n; i++)     srs.push(new TheService(ar[i], constants));       
            this.servs = srs;
        }
           
       
        getServices(): TheService[]{
            return this.servs;         
       }



    }

}

