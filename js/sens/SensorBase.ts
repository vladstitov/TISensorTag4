/**
 * Created by Vlad on 3/2/2015.
 */
module sens{
    export class SensorBase{
        id:string
        theTag:any
        DATA_ID:string;
        CONF_ID:string;
        PERIOD_ID:string
        enabled:boolean;
        characteristics:{config:string;period:string;data:any};
        descriptors:{notification:any};
        listeners:Function[];
        constructor(name:string,thetag:any,UUID_DATA:string,UUID_CONF:string,UUID_PERIOD:string){
            this.id=name;
            this.theTag=thetag;
            this.DATA_ID=UUID_DATA;
            this.CONF_ID=UUID_CONF;
            this.PERIOD_ID=UUID_PERIOD;
            this.characteristics = { config: null, period: null, data: null };
            this.listeners=[];
        }

        initService(service):void{
           // this.DATA_ID.test
        }
    }
}
