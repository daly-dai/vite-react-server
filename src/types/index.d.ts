declare module 'koa' {
  interface DefaultState {
    stateProperty: boolean;
  }

  interface DefaultContext {
    success: any;
    error: any;
  }
}