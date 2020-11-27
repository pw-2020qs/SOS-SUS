import { Hospitals, hospitalList } from '../models/Hospital';
import hospitais from '../models/Hospital-Model';

export const getHospitalsList = async (req:any, res:any) => {
    hospitais.find((err: any, result: any) => {
        if (err) {
          res.send("Error!");
        } else {
        console.log(JSON.stringify(result))
        res.send(result);
        }
      });
  };

  export const createProduct = async (req:any, res:any) => {
    const request: Hospitals = hospitalList;
    console.log(JSON.stringify(request))
    let hosp = new hospitais(request);
    hosp.save((err:any, result:any) => {
        if (err) {
            res.send("Error!");
          } else {
          console.log(JSON.stringify(result))
        res.send(result);
          }
    });
  };
