export type Result<T, E = Error> = { ok: boolean; value?: T; error?: E }
