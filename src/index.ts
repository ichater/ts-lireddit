import {MikroORM} from "@mikro-orm/core";
// import { dirname } from "path";
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from 'express'



const main = async () => {
   const orm = await MikroORM.init(mikroConfig);
   await orm.getMigrator().up()

   const app = express();
   app.get('/', (_, res)=>{
      res.send("Hola!")
   })
   app.listen(4000, ()=> {
      console.log('listening on localhost:4000')
   })
}

main().catch(err => { console.error(err)})

