import {MikroORM} from "@mikro-orm/core";
// import { dirname } from "path";
// import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";



const main = async () => {
   console.log("dirname:" + __dirname)
   
   const orm = await MikroORM.init(mikroConfig);
   await orm.getMigrator().up()
   // const post = orm.em.create(Post, {title: 'my first post' })
   // await orm.em.persistAndFlush(post)
   // console.log(post)
   // const posts = await orm.em.find(Post, {title: 'my first post' });
   // console.log(posts)

}

main().catch(err => { console.error(err)})

