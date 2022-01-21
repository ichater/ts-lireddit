import { User } from "../entities/User";
import {
  Mutation,
  Resolver,
  InputType,
  Field,
  Arg,
  Ctx,
  ObjectType,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResonse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }

  @Mutation(() => UserResonse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResonse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [{ field: "username", message: "Username doesent exist" }],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "username", message: "password incorrect" }],
      };
    }

    return { user };
  }
}
