import { create } from './create/create';

export const makeFactory =
  <Props, Interface>(prototype: Interface & ThisType<Interface & Props>) =>
  <T extends Props>(props: T & ThisType<Interface & T>): Interface =>
    create(props, { prototype });

export default makeFactory;
