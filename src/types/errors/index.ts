export class ParameterMappingNotFoundError extends Error {
  constructor() {
    super("Parameter mapping not found!");
    this.name = "ParameterMappingNotFoundError";
  }
}
