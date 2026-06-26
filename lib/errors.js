/**
 * Centralized error classes for the Aetheris architecture.
 */

export class AetherisError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = this.constructor.name;
    this.context = context;
    Error.captureStackTrace(this, this.constructor);
  }
}

/** Level 0: Client/IO Errors */
export class ClientError extends AetherisError {}

/** Level 1: Mapping Errors */
export class MapperError extends AetherisError {}

/** Level 2: Domain Logic Errors */
export class LogicError extends AetherisError {}

/** Level 3: Orchestration Errors */
export class OrchestratorError extends AetherisError {}
