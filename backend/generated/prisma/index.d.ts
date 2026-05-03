
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * * User
 *  *
 *  * Represents an app user.
 *  * In the MVP, users can create receipts and shopping lists.
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Market
 * * Market
 *  *
 *  * Represents a grocery market or supermarket.
 *  * This model stores identity and optional location data.
 */
export type Market = $Result.DefaultSelection<Prisma.$MarketPayload>
/**
 * Model Receipt
 * * Receipt
 *  *
 *  * Represents a receipt submitted by a user.
 *  * Receipts are the main source of real-world price data in ShopWise.
 */
export type Receipt = $Result.DefaultSelection<Prisma.$ReceiptPayload>
/**
 * Model ReceiptItem
 * * ReceiptItem
 *  *
 *  * Stores each line item found in a receipt.
 *  * nameRaw preserves the original text from the receipt.
 */
export type ReceiptItem = $Result.DefaultSelection<Prisma.$ReceiptItemPayload>
/**
 * Model Product
 * * Product
 *  *
 *  * Represents a normalized product in the system.
 *  * normalizedName should be the canonical version used for comparisons.
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model PriceRecord
 * * PriceRecord
 *  *
 *  * Represents an observed price for a product in a market at a specific time.
 *  * This is the main historical table used by recommendations and analytics.
 */
export type PriceRecord = $Result.DefaultSelection<Prisma.$PriceRecordPayload>
/**
 * Model ShoppingList
 * * ShoppingList
 *  *
 *  * Represents a shopping list created by a user.
 */
export type ShoppingList = $Result.DefaultSelection<Prisma.$ShoppingListPayload>
/**
 * Model ShoppingListItem
 * * ShoppingListItem
 *  *
 *  * Represents one desired item inside a shopping list.
 *  * productId is optional in the MVP to keep list creation flexible.
 */
export type ShoppingListItem = $Result.DefaultSelection<Prisma.$ShoppingListItemPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ReceiptSource: {
  MANUAL: 'MANUAL',
  QR_CODE: 'QR_CODE',
  IMPORTED: 'IMPORTED'
};

export type ReceiptSource = (typeof ReceiptSource)[keyof typeof ReceiptSource]

}

export type ReceiptSource = $Enums.ReceiptSource

export const ReceiptSource: typeof $Enums.ReceiptSource

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.market`: Exposes CRUD operations for the **Market** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Markets
    * const markets = await prisma.market.findMany()
    * ```
    */
  get market(): Prisma.MarketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.receipt`: Exposes CRUD operations for the **Receipt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Receipts
    * const receipts = await prisma.receipt.findMany()
    * ```
    */
  get receipt(): Prisma.ReceiptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.receiptItem`: Exposes CRUD operations for the **ReceiptItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReceiptItems
    * const receiptItems = await prisma.receiptItem.findMany()
    * ```
    */
  get receiptItem(): Prisma.ReceiptItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.priceRecord`: Exposes CRUD operations for the **PriceRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PriceRecords
    * const priceRecords = await prisma.priceRecord.findMany()
    * ```
    */
  get priceRecord(): Prisma.PriceRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shoppingList`: Exposes CRUD operations for the **ShoppingList** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShoppingLists
    * const shoppingLists = await prisma.shoppingList.findMany()
    * ```
    */
  get shoppingList(): Prisma.ShoppingListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shoppingListItem`: Exposes CRUD operations for the **ShoppingListItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ShoppingListItems
    * const shoppingListItems = await prisma.shoppingListItem.findMany()
    * ```
    */
  get shoppingListItem(): Prisma.ShoppingListItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Market: 'Market',
    Receipt: 'Receipt',
    ReceiptItem: 'ReceiptItem',
    Product: 'Product',
    PriceRecord: 'PriceRecord',
    ShoppingList: 'ShoppingList',
    ShoppingListItem: 'ShoppingListItem',
    PasswordResetToken: 'PasswordResetToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "market" | "receipt" | "receiptItem" | "product" | "priceRecord" | "shoppingList" | "shoppingListItem" | "passwordResetToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Market: {
        payload: Prisma.$MarketPayload<ExtArgs>
        fields: Prisma.MarketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findFirst: {
            args: Prisma.MarketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          findMany: {
            args: Prisma.MarketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          create: {
            args: Prisma.MarketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          createMany: {
            args: Prisma.MarketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          delete: {
            args: Prisma.MarketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          update: {
            args: Prisma.MarketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          deleteMany: {
            args: Prisma.MarketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>[]
          }
          upsert: {
            args: Prisma.MarketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPayload>
          }
          aggregate: {
            args: Prisma.MarketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarket>
          }
          groupBy: {
            args: Prisma.MarketGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketCountArgs<ExtArgs>
            result: $Utils.Optional<MarketCountAggregateOutputType> | number
          }
        }
      }
      Receipt: {
        payload: Prisma.$ReceiptPayload<ExtArgs>
        fields: Prisma.ReceiptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReceiptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReceiptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findFirst: {
            args: Prisma.ReceiptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReceiptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          findMany: {
            args: Prisma.ReceiptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          create: {
            args: Prisma.ReceiptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          createMany: {
            args: Prisma.ReceiptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReceiptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          delete: {
            args: Prisma.ReceiptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          update: {
            args: Prisma.ReceiptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          deleteMany: {
            args: Prisma.ReceiptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReceiptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReceiptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>[]
          }
          upsert: {
            args: Prisma.ReceiptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptPayload>
          }
          aggregate: {
            args: Prisma.ReceiptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReceipt>
          }
          groupBy: {
            args: Prisma.ReceiptGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReceiptGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReceiptCountArgs<ExtArgs>
            result: $Utils.Optional<ReceiptCountAggregateOutputType> | number
          }
        }
      }
      ReceiptItem: {
        payload: Prisma.$ReceiptItemPayload<ExtArgs>
        fields: Prisma.ReceiptItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReceiptItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReceiptItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>
          }
          findFirst: {
            args: Prisma.ReceiptItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReceiptItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>
          }
          findMany: {
            args: Prisma.ReceiptItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>[]
          }
          create: {
            args: Prisma.ReceiptItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>
          }
          createMany: {
            args: Prisma.ReceiptItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReceiptItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>[]
          }
          delete: {
            args: Prisma.ReceiptItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>
          }
          update: {
            args: Prisma.ReceiptItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>
          }
          deleteMany: {
            args: Prisma.ReceiptItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReceiptItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReceiptItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>[]
          }
          upsert: {
            args: Prisma.ReceiptItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReceiptItemPayload>
          }
          aggregate: {
            args: Prisma.ReceiptItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReceiptItem>
          }
          groupBy: {
            args: Prisma.ReceiptItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReceiptItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReceiptItemCountArgs<ExtArgs>
            result: $Utils.Optional<ReceiptItemCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      PriceRecord: {
        payload: Prisma.$PriceRecordPayload<ExtArgs>
        fields: Prisma.PriceRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PriceRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PriceRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>
          }
          findFirst: {
            args: Prisma.PriceRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PriceRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>
          }
          findMany: {
            args: Prisma.PriceRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>[]
          }
          create: {
            args: Prisma.PriceRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>
          }
          createMany: {
            args: Prisma.PriceRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PriceRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>[]
          }
          delete: {
            args: Prisma.PriceRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>
          }
          update: {
            args: Prisma.PriceRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>
          }
          deleteMany: {
            args: Prisma.PriceRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PriceRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PriceRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>[]
          }
          upsert: {
            args: Prisma.PriceRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PriceRecordPayload>
          }
          aggregate: {
            args: Prisma.PriceRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePriceRecord>
          }
          groupBy: {
            args: Prisma.PriceRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<PriceRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.PriceRecordCountArgs<ExtArgs>
            result: $Utils.Optional<PriceRecordCountAggregateOutputType> | number
          }
        }
      }
      ShoppingList: {
        payload: Prisma.$ShoppingListPayload<ExtArgs>
        fields: Prisma.ShoppingListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShoppingListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShoppingListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>
          }
          findFirst: {
            args: Prisma.ShoppingListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShoppingListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>
          }
          findMany: {
            args: Prisma.ShoppingListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>[]
          }
          create: {
            args: Prisma.ShoppingListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>
          }
          createMany: {
            args: Prisma.ShoppingListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShoppingListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>[]
          }
          delete: {
            args: Prisma.ShoppingListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>
          }
          update: {
            args: Prisma.ShoppingListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>
          }
          deleteMany: {
            args: Prisma.ShoppingListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShoppingListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShoppingListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>[]
          }
          upsert: {
            args: Prisma.ShoppingListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListPayload>
          }
          aggregate: {
            args: Prisma.ShoppingListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShoppingList>
          }
          groupBy: {
            args: Prisma.ShoppingListGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShoppingListGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShoppingListCountArgs<ExtArgs>
            result: $Utils.Optional<ShoppingListCountAggregateOutputType> | number
          }
        }
      }
      ShoppingListItem: {
        payload: Prisma.$ShoppingListItemPayload<ExtArgs>
        fields: Prisma.ShoppingListItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShoppingListItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShoppingListItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>
          }
          findFirst: {
            args: Prisma.ShoppingListItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShoppingListItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>
          }
          findMany: {
            args: Prisma.ShoppingListItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>[]
          }
          create: {
            args: Prisma.ShoppingListItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>
          }
          createMany: {
            args: Prisma.ShoppingListItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShoppingListItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>[]
          }
          delete: {
            args: Prisma.ShoppingListItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>
          }
          update: {
            args: Prisma.ShoppingListItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>
          }
          deleteMany: {
            args: Prisma.ShoppingListItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShoppingListItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShoppingListItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>[]
          }
          upsert: {
            args: Prisma.ShoppingListItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShoppingListItemPayload>
          }
          aggregate: {
            args: Prisma.ShoppingListItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShoppingListItem>
          }
          groupBy: {
            args: Prisma.ShoppingListItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShoppingListItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShoppingListItemCountArgs<ExtArgs>
            result: $Utils.Optional<ShoppingListItemCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    market?: MarketOmit
    receipt?: ReceiptOmit
    receiptItem?: ReceiptItemOmit
    product?: ProductOmit
    priceRecord?: PriceRecordOmit
    shoppingList?: ShoppingListOmit
    shoppingListItem?: ShoppingListItemOmit
    passwordResetToken?: PasswordResetTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    receipts: number
    shoppingLists: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipts?: boolean | UserCountOutputTypeCountReceiptsArgs
    shoppingLists?: boolean | UserCountOutputTypeCountShoppingListsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountShoppingListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShoppingListWhereInput
  }


  /**
   * Count Type MarketCountOutputType
   */

  export type MarketCountOutputType = {
    receipts: number
    priceRecords: number
  }

  export type MarketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipts?: boolean | MarketCountOutputTypeCountReceiptsArgs
    priceRecords?: boolean | MarketCountOutputTypeCountPriceRecordsArgs
  }

  // Custom InputTypes
  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketCountOutputType
     */
    select?: MarketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountReceiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
  }

  /**
   * MarketCountOutputType without action
   */
  export type MarketCountOutputTypeCountPriceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceRecordWhereInput
  }


  /**
   * Count Type ReceiptCountOutputType
   */

  export type ReceiptCountOutputType = {
    items: number
  }

  export type ReceiptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ReceiptCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * ReceiptCountOutputType without action
   */
  export type ReceiptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptCountOutputType
     */
    select?: ReceiptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReceiptCountOutputType without action
   */
  export type ReceiptCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptItemWhereInput
  }


  /**
   * Count Type ReceiptItemCountOutputType
   */

  export type ReceiptItemCountOutputType = {
    priceRecords: number
  }

  export type ReceiptItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    priceRecords?: boolean | ReceiptItemCountOutputTypeCountPriceRecordsArgs
  }

  // Custom InputTypes
  /**
   * ReceiptItemCountOutputType without action
   */
  export type ReceiptItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItemCountOutputType
     */
    select?: ReceiptItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReceiptItemCountOutputType without action
   */
  export type ReceiptItemCountOutputTypeCountPriceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceRecordWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    receiptItems: number
    priceRecords: number
    shoppingListItems: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiptItems?: boolean | ProductCountOutputTypeCountReceiptItemsArgs
    priceRecords?: boolean | ProductCountOutputTypeCountPriceRecordsArgs
    shoppingListItems?: boolean | ProductCountOutputTypeCountShoppingListItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReceiptItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountPriceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceRecordWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountShoppingListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShoppingListItemWhereInput
  }


  /**
   * Count Type ShoppingListCountOutputType
   */

  export type ShoppingListCountOutputType = {
    items: number
  }

  export type ShoppingListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | ShoppingListCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * ShoppingListCountOutputType without action
   */
  export type ShoppingListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListCountOutputType
     */
    select?: ShoppingListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShoppingListCountOutputType without action
   */
  export type ShoppingListCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShoppingListItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    homeLatitude: number | null
    homeLongitude: number | null
  }

  export type UserSumAggregateOutputType = {
    homeLatitude: number | null
    homeLongitude: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    recommendationStrategy: string | null
    homeLatitude: number | null
    homeLongitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    recommendationStrategy: string | null
    homeLatitude: number | null
    homeLongitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    recommendationStrategy: number
    homeLatitude: number
    homeLongitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    homeLatitude?: true
    homeLongitude?: true
  }

  export type UserSumAggregateInputType = {
    homeLatitude?: true
    homeLongitude?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    recommendationStrategy?: true
    homeLatitude?: true
    homeLongitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    recommendationStrategy?: true
    homeLatitude?: true
    homeLongitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    recommendationStrategy?: true
    homeLatitude?: true
    homeLongitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy: string | null
    homeLatitude: number | null
    homeLongitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    recommendationStrategy?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    receipts?: boolean | User$receiptsArgs<ExtArgs>
    shoppingLists?: boolean | User$shoppingListsArgs<ExtArgs>
    passwordResetToken?: boolean | User$passwordResetTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    recommendationStrategy?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    recommendationStrategy?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    recommendationStrategy?: boolean
    homeLatitude?: boolean
    homeLongitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "recommendationStrategy" | "homeLatitude" | "homeLongitude" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipts?: boolean | User$receiptsArgs<ExtArgs>
    shoppingLists?: boolean | User$shoppingListsArgs<ExtArgs>
    passwordResetToken?: boolean | User$passwordResetTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      receipts: Prisma.$ReceiptPayload<ExtArgs>[]
      shoppingLists: Prisma.$ShoppingListPayload<ExtArgs>[]
      passwordResetToken: Prisma.$PasswordResetTokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      passwordHash: string
      recommendationStrategy: string | null
      homeLatitude: number | null
      homeLongitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receipts<T extends User$receiptsArgs<ExtArgs> = {}>(args?: Subset<T, User$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shoppingLists<T extends User$shoppingListsArgs<ExtArgs> = {}>(args?: Subset<T, User$shoppingListsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordResetToken<T extends User$passwordResetTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetTokenArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly recommendationStrategy: FieldRef<"User", 'String'>
    readonly homeLatitude: FieldRef<"User", 'Float'>
    readonly homeLongitude: FieldRef<"User", 'Float'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.receipts
   */
  export type User$receiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    cursor?: ReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * User.shoppingLists
   */
  export type User$shoppingListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    where?: ShoppingListWhereInput
    orderBy?: ShoppingListOrderByWithRelationInput | ShoppingListOrderByWithRelationInput[]
    cursor?: ShoppingListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShoppingListScalarFieldEnum | ShoppingListScalarFieldEnum[]
  }

  /**
   * User.passwordResetToken
   */
  export type User$passwordResetTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Market
   */

  export type AggregateMarket = {
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  export type MarketAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type MarketSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type MarketMinAggregateOutputType = {
    id: string | null
    name: string | null
    displayName: string | null
    cnpj: string | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketMaxAggregateOutputType = {
    id: string | null
    name: string | null
    displayName: string | null
    cnpj: string | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarketCountAggregateOutputType = {
    id: number
    name: number
    displayName: number
    cnpj: number
    address: number
    city: number
    state: number
    zipCode: number
    latitude: number
    longitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MarketAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type MarketSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type MarketMinAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    cnpj?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketMaxAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    cnpj?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarketCountAggregateInputType = {
    id?: true
    name?: true
    displayName?: true
    cnpj?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MarketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Market to aggregate.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Markets
    **/
    _count?: true | MarketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketMaxAggregateInputType
  }

  export type GetMarketAggregateType<T extends MarketAggregateArgs> = {
        [P in keyof T & keyof AggregateMarket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarket[P]>
      : GetScalarType<T[P], AggregateMarket[P]>
  }




  export type MarketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketWhereInput
    orderBy?: MarketOrderByWithAggregationInput | MarketOrderByWithAggregationInput[]
    by: MarketScalarFieldEnum[] | MarketScalarFieldEnum
    having?: MarketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketCountAggregateInputType | true
    _avg?: MarketAvgAggregateInputType
    _sum?: MarketSumAggregateInputType
    _min?: MarketMinAggregateInputType
    _max?: MarketMaxAggregateInputType
  }

  export type MarketGroupByOutputType = {
    id: string
    name: string
    displayName: string | null
    cnpj: string | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: MarketCountAggregateOutputType | null
    _avg: MarketAvgAggregateOutputType | null
    _sum: MarketSumAggregateOutputType | null
    _min: MarketMinAggregateOutputType | null
    _max: MarketMaxAggregateOutputType | null
  }

  type GetMarketGroupByPayload<T extends MarketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketGroupByOutputType[P]>
            : GetScalarType<T[P], MarketGroupByOutputType[P]>
        }
      >
    >


  export type MarketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    cnpj?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    receipts?: boolean | Market$receiptsArgs<ExtArgs>
    priceRecords?: boolean | Market$priceRecordsArgs<ExtArgs>
    _count?: boolean | MarketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["market"]>

  export type MarketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    cnpj?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    displayName?: boolean
    cnpj?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["market"]>

  export type MarketSelectScalar = {
    id?: boolean
    name?: boolean
    displayName?: boolean
    cnpj?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MarketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "displayName" | "cnpj" | "address" | "city" | "state" | "zipCode" | "latitude" | "longitude" | "createdAt" | "updatedAt", ExtArgs["result"]["market"]>
  export type MarketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipts?: boolean | Market$receiptsArgs<ExtArgs>
    priceRecords?: boolean | Market$priceRecordsArgs<ExtArgs>
    _count?: boolean | MarketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MarketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MarketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MarketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Market"
    objects: {
      receipts: Prisma.$ReceiptPayload<ExtArgs>[]
      priceRecords: Prisma.$PriceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      displayName: string | null
      cnpj: string | null
      address: string | null
      city: string | null
      state: string | null
      zipCode: string | null
      latitude: number | null
      longitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["market"]>
    composites: {}
  }

  type MarketGetPayload<S extends boolean | null | undefined | MarketDefaultArgs> = $Result.GetResult<Prisma.$MarketPayload, S>

  type MarketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketCountAggregateInputType | true
    }

  export interface MarketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Market'], meta: { name: 'Market' } }
    /**
     * Find zero or one Market that matches the filter.
     * @param {MarketFindUniqueArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketFindUniqueArgs>(args: SelectSubset<T, MarketFindUniqueArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Market that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketFindUniqueOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketFindFirstArgs>(args?: SelectSubset<T, MarketFindFirstArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Market that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindFirstOrThrowArgs} args - Arguments to find a Market
     * @example
     * // Get one Market
     * const market = await prisma.market.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Markets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Markets
     * const markets = await prisma.market.findMany()
     * 
     * // Get first 10 Markets
     * const markets = await prisma.market.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketWithIdOnly = await prisma.market.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketFindManyArgs>(args?: SelectSubset<T, MarketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Market.
     * @param {MarketCreateArgs} args - Arguments to create a Market.
     * @example
     * // Create one Market
     * const Market = await prisma.market.create({
     *   data: {
     *     // ... data to create a Market
     *   }
     * })
     * 
     */
    create<T extends MarketCreateArgs>(args: SelectSubset<T, MarketCreateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Markets.
     * @param {MarketCreateManyArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketCreateManyArgs>(args?: SelectSubset<T, MarketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Markets and returns the data saved in the database.
     * @param {MarketCreateManyAndReturnArgs} args - Arguments to create many Markets.
     * @example
     * // Create many Markets
     * const market = await prisma.market.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Market.
     * @param {MarketDeleteArgs} args - Arguments to delete one Market.
     * @example
     * // Delete one Market
     * const Market = await prisma.market.delete({
     *   where: {
     *     // ... filter to delete one Market
     *   }
     * })
     * 
     */
    delete<T extends MarketDeleteArgs>(args: SelectSubset<T, MarketDeleteArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Market.
     * @param {MarketUpdateArgs} args - Arguments to update one Market.
     * @example
     * // Update one Market
     * const market = await prisma.market.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketUpdateArgs>(args: SelectSubset<T, MarketUpdateArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Markets.
     * @param {MarketDeleteManyArgs} args - Arguments to filter Markets to delete.
     * @example
     * // Delete a few Markets
     * const { count } = await prisma.market.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketDeleteManyArgs>(args?: SelectSubset<T, MarketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketUpdateManyArgs>(args: SelectSubset<T, MarketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Markets and returns the data updated in the database.
     * @param {MarketUpdateManyAndReturnArgs} args - Arguments to update many Markets.
     * @example
     * // Update many Markets
     * const market = await prisma.market.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Markets and only return the `id`
     * const marketWithIdOnly = await prisma.market.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Market.
     * @param {MarketUpsertArgs} args - Arguments to update or create a Market.
     * @example
     * // Update or create a Market
     * const market = await prisma.market.upsert({
     *   create: {
     *     // ... data to create a Market
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Market we want to update
     *   }
     * })
     */
    upsert<T extends MarketUpsertArgs>(args: SelectSubset<T, MarketUpsertArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Markets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketCountArgs} args - Arguments to filter Markets to count.
     * @example
     * // Count the number of Markets
     * const count = await prisma.market.count({
     *   where: {
     *     // ... the filter for the Markets we want to count
     *   }
     * })
    **/
    count<T extends MarketCountArgs>(
      args?: Subset<T, MarketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketAggregateArgs>(args: Subset<T, MarketAggregateArgs>): Prisma.PrismaPromise<GetMarketAggregateType<T>>

    /**
     * Group by Market.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketGroupByArgs['orderBy'] }
        : { orderBy?: MarketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Market model
   */
  readonly fields: MarketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Market.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receipts<T extends Market$receiptsArgs<ExtArgs> = {}>(args?: Subset<T, Market$receiptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceRecords<T extends Market$priceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Market$priceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Market model
   */
  interface MarketFieldRefs {
    readonly id: FieldRef<"Market", 'String'>
    readonly name: FieldRef<"Market", 'String'>
    readonly displayName: FieldRef<"Market", 'String'>
    readonly cnpj: FieldRef<"Market", 'String'>
    readonly address: FieldRef<"Market", 'String'>
    readonly city: FieldRef<"Market", 'String'>
    readonly state: FieldRef<"Market", 'String'>
    readonly zipCode: FieldRef<"Market", 'String'>
    readonly latitude: FieldRef<"Market", 'Float'>
    readonly longitude: FieldRef<"Market", 'Float'>
    readonly createdAt: FieldRef<"Market", 'DateTime'>
    readonly updatedAt: FieldRef<"Market", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Market findUnique
   */
  export type MarketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findUniqueOrThrow
   */
  export type MarketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market findFirst
   */
  export type MarketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findFirstOrThrow
   */
  export type MarketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Market to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market findMany
   */
  export type MarketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter, which Markets to fetch.
     */
    where?: MarketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Markets to fetch.
     */
    orderBy?: MarketOrderByWithRelationInput | MarketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Markets.
     */
    cursor?: MarketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Markets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Markets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Markets.
     */
    distinct?: MarketScalarFieldEnum | MarketScalarFieldEnum[]
  }

  /**
   * Market create
   */
  export type MarketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The data needed to create a Market.
     */
    data: XOR<MarketCreateInput, MarketUncheckedCreateInput>
  }

  /**
   * Market createMany
   */
  export type MarketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market createManyAndReturn
   */
  export type MarketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to create many Markets.
     */
    data: MarketCreateManyInput | MarketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Market update
   */
  export type MarketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The data needed to update a Market.
     */
    data: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
    /**
     * Choose, which Market to update.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market updateMany
   */
  export type MarketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market updateManyAndReturn
   */
  export type MarketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * The data used to update Markets.
     */
    data: XOR<MarketUpdateManyMutationInput, MarketUncheckedUpdateManyInput>
    /**
     * Filter which Markets to update
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to update.
     */
    limit?: number
  }

  /**
   * Market upsert
   */
  export type MarketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * The filter to search for the Market to update in case it exists.
     */
    where: MarketWhereUniqueInput
    /**
     * In case the Market found by the `where` argument doesn't exist, create a new Market with this data.
     */
    create: XOR<MarketCreateInput, MarketUncheckedCreateInput>
    /**
     * In case the Market was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketUpdateInput, MarketUncheckedUpdateInput>
  }

  /**
   * Market delete
   */
  export type MarketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
    /**
     * Filter which Market to delete.
     */
    where: MarketWhereUniqueInput
  }

  /**
   * Market deleteMany
   */
  export type MarketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Markets to delete
     */
    where?: MarketWhereInput
    /**
     * Limit how many Markets to delete.
     */
    limit?: number
  }

  /**
   * Market.receipts
   */
  export type Market$receiptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    cursor?: ReceiptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Market.priceRecords
   */
  export type Market$priceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    where?: PriceRecordWhereInput
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    cursor?: PriceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceRecordScalarFieldEnum | PriceRecordScalarFieldEnum[]
  }

  /**
   * Market without action
   */
  export type MarketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Market
     */
    select?: MarketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Market
     */
    omit?: MarketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketInclude<ExtArgs> | null
  }


  /**
   * Model Receipt
   */

  export type AggregateReceipt = {
    _count: ReceiptCountAggregateOutputType | null
    _avg: ReceiptAvgAggregateOutputType | null
    _sum: ReceiptSumAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  export type ReceiptAvgAggregateOutputType = {
    totalAmount: number | null
    parsingScore: number | null
  }

  export type ReceiptSumAggregateOutputType = {
    totalAmount: number | null
    parsingScore: number | null
  }

  export type ReceiptMinAggregateOutputType = {
    id: string | null
    userId: string | null
    marketId: string | null
    externalCode: string | null
    sourceType: $Enums.ReceiptSource | null
    totalAmount: number | null
    purchasedAt: Date | null
    parsingScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReceiptMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    marketId: string | null
    externalCode: string | null
    sourceType: $Enums.ReceiptSource | null
    totalAmount: number | null
    purchasedAt: Date | null
    parsingScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReceiptCountAggregateOutputType = {
    id: number
    userId: number
    marketId: number
    externalCode: number
    sourceType: number
    totalAmount: number
    purchasedAt: number
    parsingScore: number
    parsingWarnings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReceiptAvgAggregateInputType = {
    totalAmount?: true
    parsingScore?: true
  }

  export type ReceiptSumAggregateInputType = {
    totalAmount?: true
    parsingScore?: true
  }

  export type ReceiptMinAggregateInputType = {
    id?: true
    userId?: true
    marketId?: true
    externalCode?: true
    sourceType?: true
    totalAmount?: true
    purchasedAt?: true
    parsingScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReceiptMaxAggregateInputType = {
    id?: true
    userId?: true
    marketId?: true
    externalCode?: true
    sourceType?: true
    totalAmount?: true
    purchasedAt?: true
    parsingScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReceiptCountAggregateInputType = {
    id?: true
    userId?: true
    marketId?: true
    externalCode?: true
    sourceType?: true
    totalAmount?: true
    purchasedAt?: true
    parsingScore?: true
    parsingWarnings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReceiptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipt to aggregate.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Receipts
    **/
    _count?: true | ReceiptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReceiptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReceiptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReceiptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReceiptMaxAggregateInputType
  }

  export type GetReceiptAggregateType<T extends ReceiptAggregateArgs> = {
        [P in keyof T & keyof AggregateReceipt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReceipt[P]>
      : GetScalarType<T[P], AggregateReceipt[P]>
  }




  export type ReceiptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptWhereInput
    orderBy?: ReceiptOrderByWithAggregationInput | ReceiptOrderByWithAggregationInput[]
    by: ReceiptScalarFieldEnum[] | ReceiptScalarFieldEnum
    having?: ReceiptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReceiptCountAggregateInputType | true
    _avg?: ReceiptAvgAggregateInputType
    _sum?: ReceiptSumAggregateInputType
    _min?: ReceiptMinAggregateInputType
    _max?: ReceiptMaxAggregateInputType
  }

  export type ReceiptGroupByOutputType = {
    id: string
    userId: string
    marketId: string
    externalCode: string | null
    sourceType: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date
    parsingScore: number | null
    parsingWarnings: string[]
    createdAt: Date
    updatedAt: Date
    _count: ReceiptCountAggregateOutputType | null
    _avg: ReceiptAvgAggregateOutputType | null
    _sum: ReceiptSumAggregateOutputType | null
    _min: ReceiptMinAggregateOutputType | null
    _max: ReceiptMaxAggregateOutputType | null
  }

  type GetReceiptGroupByPayload<T extends ReceiptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReceiptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReceiptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
            : GetScalarType<T[P], ReceiptGroupByOutputType[P]>
        }
      >
    >


  export type ReceiptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketId?: boolean
    externalCode?: boolean
    sourceType?: boolean
    totalAmount?: boolean
    purchasedAt?: boolean
    parsingScore?: boolean
    parsingWarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    items?: boolean | Receipt$itemsArgs<ExtArgs>
    _count?: boolean | ReceiptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketId?: boolean
    externalCode?: boolean
    sourceType?: boolean
    totalAmount?: boolean
    purchasedAt?: boolean
    parsingScore?: boolean
    parsingWarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    marketId?: boolean
    externalCode?: boolean
    sourceType?: boolean
    totalAmount?: boolean
    purchasedAt?: boolean
    parsingScore?: boolean
    parsingWarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receipt"]>

  export type ReceiptSelectScalar = {
    id?: boolean
    userId?: boolean
    marketId?: boolean
    externalCode?: boolean
    sourceType?: boolean
    totalAmount?: boolean
    purchasedAt?: boolean
    parsingScore?: boolean
    parsingWarnings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReceiptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "marketId" | "externalCode" | "sourceType" | "totalAmount" | "purchasedAt" | "parsingScore" | "parsingWarnings" | "createdAt" | "updatedAt", ExtArgs["result"]["receipt"]>
  export type ReceiptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    items?: boolean | Receipt$itemsArgs<ExtArgs>
    _count?: boolean | ReceiptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReceiptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }
  export type ReceiptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
  }

  export type $ReceiptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Receipt"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      market: Prisma.$MarketPayload<ExtArgs>
      items: Prisma.$ReceiptItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      marketId: string
      externalCode: string | null
      sourceType: $Enums.ReceiptSource
      totalAmount: number
      purchasedAt: Date
      parsingScore: number | null
      parsingWarnings: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["receipt"]>
    composites: {}
  }

  type ReceiptGetPayload<S extends boolean | null | undefined | ReceiptDefaultArgs> = $Result.GetResult<Prisma.$ReceiptPayload, S>

  type ReceiptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReceiptCountAggregateInputType | true
    }

  export interface ReceiptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Receipt'], meta: { name: 'Receipt' } }
    /**
     * Find zero or one Receipt that matches the filter.
     * @param {ReceiptFindUniqueArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReceiptFindUniqueArgs>(args: SelectSubset<T, ReceiptFindUniqueArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Receipt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReceiptFindUniqueOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReceiptFindUniqueOrThrowArgs>(args: SelectSubset<T, ReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReceiptFindFirstArgs>(args?: SelectSubset<T, ReceiptFindFirstArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Receipt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindFirstOrThrowArgs} args - Arguments to find a Receipt
     * @example
     * // Get one Receipt
     * const receipt = await prisma.receipt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReceiptFindFirstOrThrowArgs>(args?: SelectSubset<T, ReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Receipts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Receipts
     * const receipts = await prisma.receipt.findMany()
     * 
     * // Get first 10 Receipts
     * const receipts = await prisma.receipt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const receiptWithIdOnly = await prisma.receipt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReceiptFindManyArgs>(args?: SelectSubset<T, ReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Receipt.
     * @param {ReceiptCreateArgs} args - Arguments to create a Receipt.
     * @example
     * // Create one Receipt
     * const Receipt = await prisma.receipt.create({
     *   data: {
     *     // ... data to create a Receipt
     *   }
     * })
     * 
     */
    create<T extends ReceiptCreateArgs>(args: SelectSubset<T, ReceiptCreateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Receipts.
     * @param {ReceiptCreateManyArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReceiptCreateManyArgs>(args?: SelectSubset<T, ReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Receipts and returns the data saved in the database.
     * @param {ReceiptCreateManyAndReturnArgs} args - Arguments to create many Receipts.
     * @example
     * // Create many Receipts
     * const receipt = await prisma.receipt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Receipts and only return the `id`
     * const receiptWithIdOnly = await prisma.receipt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReceiptCreateManyAndReturnArgs>(args?: SelectSubset<T, ReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Receipt.
     * @param {ReceiptDeleteArgs} args - Arguments to delete one Receipt.
     * @example
     * // Delete one Receipt
     * const Receipt = await prisma.receipt.delete({
     *   where: {
     *     // ... filter to delete one Receipt
     *   }
     * })
     * 
     */
    delete<T extends ReceiptDeleteArgs>(args: SelectSubset<T, ReceiptDeleteArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Receipt.
     * @param {ReceiptUpdateArgs} args - Arguments to update one Receipt.
     * @example
     * // Update one Receipt
     * const receipt = await prisma.receipt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReceiptUpdateArgs>(args: SelectSubset<T, ReceiptUpdateArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Receipts.
     * @param {ReceiptDeleteManyArgs} args - Arguments to filter Receipts to delete.
     * @example
     * // Delete a few Receipts
     * const { count } = await prisma.receipt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReceiptDeleteManyArgs>(args?: SelectSubset<T, ReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReceiptUpdateManyArgs>(args: SelectSubset<T, ReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Receipts and returns the data updated in the database.
     * @param {ReceiptUpdateManyAndReturnArgs} args - Arguments to update many Receipts.
     * @example
     * // Update many Receipts
     * const receipt = await prisma.receipt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Receipts and only return the `id`
     * const receiptWithIdOnly = await prisma.receipt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReceiptUpdateManyAndReturnArgs>(args: SelectSubset<T, ReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Receipt.
     * @param {ReceiptUpsertArgs} args - Arguments to update or create a Receipt.
     * @example
     * // Update or create a Receipt
     * const receipt = await prisma.receipt.upsert({
     *   create: {
     *     // ... data to create a Receipt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Receipt we want to update
     *   }
     * })
     */
    upsert<T extends ReceiptUpsertArgs>(args: SelectSubset<T, ReceiptUpsertArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Receipts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptCountArgs} args - Arguments to filter Receipts to count.
     * @example
     * // Count the number of Receipts
     * const count = await prisma.receipt.count({
     *   where: {
     *     // ... the filter for the Receipts we want to count
     *   }
     * })
    **/
    count<T extends ReceiptCountArgs>(
      args?: Subset<T, ReceiptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReceiptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReceiptAggregateArgs>(args: Subset<T, ReceiptAggregateArgs>): Prisma.PrismaPromise<GetReceiptAggregateType<T>>

    /**
     * Group by Receipt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReceiptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReceiptGroupByArgs['orderBy'] }
        : { orderBy?: ReceiptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Receipt model
   */
  readonly fields: ReceiptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Receipt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReceiptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Receipt$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Receipt$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Receipt model
   */
  interface ReceiptFieldRefs {
    readonly id: FieldRef<"Receipt", 'String'>
    readonly userId: FieldRef<"Receipt", 'String'>
    readonly marketId: FieldRef<"Receipt", 'String'>
    readonly externalCode: FieldRef<"Receipt", 'String'>
    readonly sourceType: FieldRef<"Receipt", 'ReceiptSource'>
    readonly totalAmount: FieldRef<"Receipt", 'Float'>
    readonly purchasedAt: FieldRef<"Receipt", 'DateTime'>
    readonly parsingScore: FieldRef<"Receipt", 'Float'>
    readonly parsingWarnings: FieldRef<"Receipt", 'String[]'>
    readonly createdAt: FieldRef<"Receipt", 'DateTime'>
    readonly updatedAt: FieldRef<"Receipt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Receipt findUnique
   */
  export type ReceiptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findUniqueOrThrow
   */
  export type ReceiptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt findFirst
   */
  export type ReceiptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findFirstOrThrow
   */
  export type ReceiptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipt to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt findMany
   */
  export type ReceiptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter, which Receipts to fetch.
     */
    where?: ReceiptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Receipts to fetch.
     */
    orderBy?: ReceiptOrderByWithRelationInput | ReceiptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Receipts.
     */
    cursor?: ReceiptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Receipts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Receipts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Receipts.
     */
    distinct?: ReceiptScalarFieldEnum | ReceiptScalarFieldEnum[]
  }

  /**
   * Receipt create
   */
  export type ReceiptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to create a Receipt.
     */
    data: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
  }

  /**
   * Receipt createMany
   */
  export type ReceiptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Receipt createManyAndReturn
   */
  export type ReceiptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to create many Receipts.
     */
    data: ReceiptCreateManyInput | ReceiptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt update
   */
  export type ReceiptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The data needed to update a Receipt.
     */
    data: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
    /**
     * Choose, which Receipt to update.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt updateMany
   */
  export type ReceiptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
  }

  /**
   * Receipt updateManyAndReturn
   */
  export type ReceiptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * The data used to update Receipts.
     */
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyInput>
    /**
     * Filter which Receipts to update
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Receipt upsert
   */
  export type ReceiptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * The filter to search for the Receipt to update in case it exists.
     */
    where: ReceiptWhereUniqueInput
    /**
     * In case the Receipt found by the `where` argument doesn't exist, create a new Receipt with this data.
     */
    create: XOR<ReceiptCreateInput, ReceiptUncheckedCreateInput>
    /**
     * In case the Receipt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReceiptUpdateInput, ReceiptUncheckedUpdateInput>
  }

  /**
   * Receipt delete
   */
  export type ReceiptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
    /**
     * Filter which Receipt to delete.
     */
    where: ReceiptWhereUniqueInput
  }

  /**
   * Receipt deleteMany
   */
  export type ReceiptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Receipts to delete
     */
    where?: ReceiptWhereInput
    /**
     * Limit how many Receipts to delete.
     */
    limit?: number
  }

  /**
   * Receipt.items
   */
  export type Receipt$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    where?: ReceiptItemWhereInput
    orderBy?: ReceiptItemOrderByWithRelationInput | ReceiptItemOrderByWithRelationInput[]
    cursor?: ReceiptItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptItemScalarFieldEnum | ReceiptItemScalarFieldEnum[]
  }

  /**
   * Receipt without action
   */
  export type ReceiptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Receipt
     */
    select?: ReceiptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Receipt
     */
    omit?: ReceiptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptInclude<ExtArgs> | null
  }


  /**
   * Model ReceiptItem
   */

  export type AggregateReceiptItem = {
    _count: ReceiptItemCountAggregateOutputType | null
    _avg: ReceiptItemAvgAggregateOutputType | null
    _sum: ReceiptItemSumAggregateOutputType | null
    _min: ReceiptItemMinAggregateOutputType | null
    _max: ReceiptItemMaxAggregateOutputType | null
  }

  export type ReceiptItemAvgAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type ReceiptItemSumAggregateOutputType = {
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
  }

  export type ReceiptItemMinAggregateOutputType = {
    id: string | null
    receiptId: string | null
    productId: string | null
    nameRaw: string | null
    unit: string | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type ReceiptItemMaxAggregateOutputType = {
    id: string | null
    receiptId: string | null
    productId: string | null
    nameRaw: string | null
    unit: string | null
    quantity: number | null
    unitPrice: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type ReceiptItemCountAggregateOutputType = {
    id: number
    receiptId: number
    productId: number
    nameRaw: number
    unit: number
    quantity: number
    unitPrice: number
    totalPrice: number
    createdAt: number
    _all: number
  }


  export type ReceiptItemAvgAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type ReceiptItemSumAggregateInputType = {
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type ReceiptItemMinAggregateInputType = {
    id?: true
    receiptId?: true
    productId?: true
    nameRaw?: true
    unit?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type ReceiptItemMaxAggregateInputType = {
    id?: true
    receiptId?: true
    productId?: true
    nameRaw?: true
    unit?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type ReceiptItemCountAggregateInputType = {
    id?: true
    receiptId?: true
    productId?: true
    nameRaw?: true
    unit?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
    _all?: true
  }

  export type ReceiptItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReceiptItem to aggregate.
     */
    where?: ReceiptItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptItems to fetch.
     */
    orderBy?: ReceiptItemOrderByWithRelationInput | ReceiptItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReceiptItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReceiptItems
    **/
    _count?: true | ReceiptItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReceiptItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReceiptItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReceiptItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReceiptItemMaxAggregateInputType
  }

  export type GetReceiptItemAggregateType<T extends ReceiptItemAggregateArgs> = {
        [P in keyof T & keyof AggregateReceiptItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReceiptItem[P]>
      : GetScalarType<T[P], AggregateReceiptItem[P]>
  }




  export type ReceiptItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReceiptItemWhereInput
    orderBy?: ReceiptItemOrderByWithAggregationInput | ReceiptItemOrderByWithAggregationInput[]
    by: ReceiptItemScalarFieldEnum[] | ReceiptItemScalarFieldEnum
    having?: ReceiptItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReceiptItemCountAggregateInputType | true
    _avg?: ReceiptItemAvgAggregateInputType
    _sum?: ReceiptItemSumAggregateInputType
    _min?: ReceiptItemMinAggregateInputType
    _max?: ReceiptItemMaxAggregateInputType
  }

  export type ReceiptItemGroupByOutputType = {
    id: string
    receiptId: string
    productId: string | null
    nameRaw: string
    unit: string | null
    quantity: number | null
    unitPrice: number
    totalPrice: number | null
    createdAt: Date
    _count: ReceiptItemCountAggregateOutputType | null
    _avg: ReceiptItemAvgAggregateOutputType | null
    _sum: ReceiptItemSumAggregateOutputType | null
    _min: ReceiptItemMinAggregateOutputType | null
    _max: ReceiptItemMaxAggregateOutputType | null
  }

  type GetReceiptItemGroupByPayload<T extends ReceiptItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReceiptItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReceiptItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReceiptItemGroupByOutputType[P]>
            : GetScalarType<T[P], ReceiptItemGroupByOutputType[P]>
        }
      >
    >


  export type ReceiptItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    receiptId?: boolean
    productId?: boolean
    nameRaw?: boolean
    unit?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    receipt?: boolean | ReceiptDefaultArgs<ExtArgs>
    product?: boolean | ReceiptItem$productArgs<ExtArgs>
    priceRecords?: boolean | ReceiptItem$priceRecordsArgs<ExtArgs>
    _count?: boolean | ReceiptItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["receiptItem"]>

  export type ReceiptItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    receiptId?: boolean
    productId?: boolean
    nameRaw?: boolean
    unit?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    receipt?: boolean | ReceiptDefaultArgs<ExtArgs>
    product?: boolean | ReceiptItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["receiptItem"]>

  export type ReceiptItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    receiptId?: boolean
    productId?: boolean
    nameRaw?: boolean
    unit?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    receipt?: boolean | ReceiptDefaultArgs<ExtArgs>
    product?: boolean | ReceiptItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["receiptItem"]>

  export type ReceiptItemSelectScalar = {
    id?: boolean
    receiptId?: boolean
    productId?: boolean
    nameRaw?: boolean
    unit?: boolean
    quantity?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
  }

  export type ReceiptItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "receiptId" | "productId" | "nameRaw" | "unit" | "quantity" | "unitPrice" | "totalPrice" | "createdAt", ExtArgs["result"]["receiptItem"]>
  export type ReceiptItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipt?: boolean | ReceiptDefaultArgs<ExtArgs>
    product?: boolean | ReceiptItem$productArgs<ExtArgs>
    priceRecords?: boolean | ReceiptItem$priceRecordsArgs<ExtArgs>
    _count?: boolean | ReceiptItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReceiptItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipt?: boolean | ReceiptDefaultArgs<ExtArgs>
    product?: boolean | ReceiptItem$productArgs<ExtArgs>
  }
  export type ReceiptItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receipt?: boolean | ReceiptDefaultArgs<ExtArgs>
    product?: boolean | ReceiptItem$productArgs<ExtArgs>
  }

  export type $ReceiptItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReceiptItem"
    objects: {
      receipt: Prisma.$ReceiptPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
      priceRecords: Prisma.$PriceRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      receiptId: string
      productId: string | null
      nameRaw: string
      unit: string | null
      quantity: number | null
      unitPrice: number
      totalPrice: number | null
      createdAt: Date
    }, ExtArgs["result"]["receiptItem"]>
    composites: {}
  }

  type ReceiptItemGetPayload<S extends boolean | null | undefined | ReceiptItemDefaultArgs> = $Result.GetResult<Prisma.$ReceiptItemPayload, S>

  type ReceiptItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReceiptItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReceiptItemCountAggregateInputType | true
    }

  export interface ReceiptItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReceiptItem'], meta: { name: 'ReceiptItem' } }
    /**
     * Find zero or one ReceiptItem that matches the filter.
     * @param {ReceiptItemFindUniqueArgs} args - Arguments to find a ReceiptItem
     * @example
     * // Get one ReceiptItem
     * const receiptItem = await prisma.receiptItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReceiptItemFindUniqueArgs>(args: SelectSubset<T, ReceiptItemFindUniqueArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReceiptItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReceiptItemFindUniqueOrThrowArgs} args - Arguments to find a ReceiptItem
     * @example
     * // Get one ReceiptItem
     * const receiptItem = await prisma.receiptItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReceiptItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ReceiptItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReceiptItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemFindFirstArgs} args - Arguments to find a ReceiptItem
     * @example
     * // Get one ReceiptItem
     * const receiptItem = await prisma.receiptItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReceiptItemFindFirstArgs>(args?: SelectSubset<T, ReceiptItemFindFirstArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReceiptItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemFindFirstOrThrowArgs} args - Arguments to find a ReceiptItem
     * @example
     * // Get one ReceiptItem
     * const receiptItem = await prisma.receiptItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReceiptItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ReceiptItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReceiptItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReceiptItems
     * const receiptItems = await prisma.receiptItem.findMany()
     * 
     * // Get first 10 ReceiptItems
     * const receiptItems = await prisma.receiptItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const receiptItemWithIdOnly = await prisma.receiptItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReceiptItemFindManyArgs>(args?: SelectSubset<T, ReceiptItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReceiptItem.
     * @param {ReceiptItemCreateArgs} args - Arguments to create a ReceiptItem.
     * @example
     * // Create one ReceiptItem
     * const ReceiptItem = await prisma.receiptItem.create({
     *   data: {
     *     // ... data to create a ReceiptItem
     *   }
     * })
     * 
     */
    create<T extends ReceiptItemCreateArgs>(args: SelectSubset<T, ReceiptItemCreateArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReceiptItems.
     * @param {ReceiptItemCreateManyArgs} args - Arguments to create many ReceiptItems.
     * @example
     * // Create many ReceiptItems
     * const receiptItem = await prisma.receiptItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReceiptItemCreateManyArgs>(args?: SelectSubset<T, ReceiptItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReceiptItems and returns the data saved in the database.
     * @param {ReceiptItemCreateManyAndReturnArgs} args - Arguments to create many ReceiptItems.
     * @example
     * // Create many ReceiptItems
     * const receiptItem = await prisma.receiptItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReceiptItems and only return the `id`
     * const receiptItemWithIdOnly = await prisma.receiptItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReceiptItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ReceiptItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReceiptItem.
     * @param {ReceiptItemDeleteArgs} args - Arguments to delete one ReceiptItem.
     * @example
     * // Delete one ReceiptItem
     * const ReceiptItem = await prisma.receiptItem.delete({
     *   where: {
     *     // ... filter to delete one ReceiptItem
     *   }
     * })
     * 
     */
    delete<T extends ReceiptItemDeleteArgs>(args: SelectSubset<T, ReceiptItemDeleteArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReceiptItem.
     * @param {ReceiptItemUpdateArgs} args - Arguments to update one ReceiptItem.
     * @example
     * // Update one ReceiptItem
     * const receiptItem = await prisma.receiptItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReceiptItemUpdateArgs>(args: SelectSubset<T, ReceiptItemUpdateArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReceiptItems.
     * @param {ReceiptItemDeleteManyArgs} args - Arguments to filter ReceiptItems to delete.
     * @example
     * // Delete a few ReceiptItems
     * const { count } = await prisma.receiptItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReceiptItemDeleteManyArgs>(args?: SelectSubset<T, ReceiptItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReceiptItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReceiptItems
     * const receiptItem = await prisma.receiptItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReceiptItemUpdateManyArgs>(args: SelectSubset<T, ReceiptItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReceiptItems and returns the data updated in the database.
     * @param {ReceiptItemUpdateManyAndReturnArgs} args - Arguments to update many ReceiptItems.
     * @example
     * // Update many ReceiptItems
     * const receiptItem = await prisma.receiptItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReceiptItems and only return the `id`
     * const receiptItemWithIdOnly = await prisma.receiptItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReceiptItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ReceiptItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReceiptItem.
     * @param {ReceiptItemUpsertArgs} args - Arguments to update or create a ReceiptItem.
     * @example
     * // Update or create a ReceiptItem
     * const receiptItem = await prisma.receiptItem.upsert({
     *   create: {
     *     // ... data to create a ReceiptItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReceiptItem we want to update
     *   }
     * })
     */
    upsert<T extends ReceiptItemUpsertArgs>(args: SelectSubset<T, ReceiptItemUpsertArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReceiptItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemCountArgs} args - Arguments to filter ReceiptItems to count.
     * @example
     * // Count the number of ReceiptItems
     * const count = await prisma.receiptItem.count({
     *   where: {
     *     // ... the filter for the ReceiptItems we want to count
     *   }
     * })
    **/
    count<T extends ReceiptItemCountArgs>(
      args?: Subset<T, ReceiptItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReceiptItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReceiptItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReceiptItemAggregateArgs>(args: Subset<T, ReceiptItemAggregateArgs>): Prisma.PrismaPromise<GetReceiptItemAggregateType<T>>

    /**
     * Group by ReceiptItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReceiptItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReceiptItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReceiptItemGroupByArgs['orderBy'] }
        : { orderBy?: ReceiptItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReceiptItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReceiptItem model
   */
  readonly fields: ReceiptItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReceiptItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReceiptItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receipt<T extends ReceiptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReceiptDefaultArgs<ExtArgs>>): Prisma__ReceiptClient<$Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ReceiptItem$productArgs<ExtArgs> = {}>(args?: Subset<T, ReceiptItem$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    priceRecords<T extends ReceiptItem$priceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, ReceiptItem$priceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReceiptItem model
   */
  interface ReceiptItemFieldRefs {
    readonly id: FieldRef<"ReceiptItem", 'String'>
    readonly receiptId: FieldRef<"ReceiptItem", 'String'>
    readonly productId: FieldRef<"ReceiptItem", 'String'>
    readonly nameRaw: FieldRef<"ReceiptItem", 'String'>
    readonly unit: FieldRef<"ReceiptItem", 'String'>
    readonly quantity: FieldRef<"ReceiptItem", 'Float'>
    readonly unitPrice: FieldRef<"ReceiptItem", 'Float'>
    readonly totalPrice: FieldRef<"ReceiptItem", 'Float'>
    readonly createdAt: FieldRef<"ReceiptItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReceiptItem findUnique
   */
  export type ReceiptItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * Filter, which ReceiptItem to fetch.
     */
    where: ReceiptItemWhereUniqueInput
  }

  /**
   * ReceiptItem findUniqueOrThrow
   */
  export type ReceiptItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * Filter, which ReceiptItem to fetch.
     */
    where: ReceiptItemWhereUniqueInput
  }

  /**
   * ReceiptItem findFirst
   */
  export type ReceiptItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * Filter, which ReceiptItem to fetch.
     */
    where?: ReceiptItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptItems to fetch.
     */
    orderBy?: ReceiptItemOrderByWithRelationInput | ReceiptItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReceiptItems.
     */
    cursor?: ReceiptItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReceiptItems.
     */
    distinct?: ReceiptItemScalarFieldEnum | ReceiptItemScalarFieldEnum[]
  }

  /**
   * ReceiptItem findFirstOrThrow
   */
  export type ReceiptItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * Filter, which ReceiptItem to fetch.
     */
    where?: ReceiptItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptItems to fetch.
     */
    orderBy?: ReceiptItemOrderByWithRelationInput | ReceiptItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReceiptItems.
     */
    cursor?: ReceiptItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReceiptItems.
     */
    distinct?: ReceiptItemScalarFieldEnum | ReceiptItemScalarFieldEnum[]
  }

  /**
   * ReceiptItem findMany
   */
  export type ReceiptItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * Filter, which ReceiptItems to fetch.
     */
    where?: ReceiptItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReceiptItems to fetch.
     */
    orderBy?: ReceiptItemOrderByWithRelationInput | ReceiptItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReceiptItems.
     */
    cursor?: ReceiptItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReceiptItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReceiptItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReceiptItems.
     */
    distinct?: ReceiptItemScalarFieldEnum | ReceiptItemScalarFieldEnum[]
  }

  /**
   * ReceiptItem create
   */
  export type ReceiptItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ReceiptItem.
     */
    data: XOR<ReceiptItemCreateInput, ReceiptItemUncheckedCreateInput>
  }

  /**
   * ReceiptItem createMany
   */
  export type ReceiptItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReceiptItems.
     */
    data: ReceiptItemCreateManyInput | ReceiptItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReceiptItem createManyAndReturn
   */
  export type ReceiptItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * The data used to create many ReceiptItems.
     */
    data: ReceiptItemCreateManyInput | ReceiptItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReceiptItem update
   */
  export type ReceiptItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ReceiptItem.
     */
    data: XOR<ReceiptItemUpdateInput, ReceiptItemUncheckedUpdateInput>
    /**
     * Choose, which ReceiptItem to update.
     */
    where: ReceiptItemWhereUniqueInput
  }

  /**
   * ReceiptItem updateMany
   */
  export type ReceiptItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReceiptItems.
     */
    data: XOR<ReceiptItemUpdateManyMutationInput, ReceiptItemUncheckedUpdateManyInput>
    /**
     * Filter which ReceiptItems to update
     */
    where?: ReceiptItemWhereInput
    /**
     * Limit how many ReceiptItems to update.
     */
    limit?: number
  }

  /**
   * ReceiptItem updateManyAndReturn
   */
  export type ReceiptItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * The data used to update ReceiptItems.
     */
    data: XOR<ReceiptItemUpdateManyMutationInput, ReceiptItemUncheckedUpdateManyInput>
    /**
     * Filter which ReceiptItems to update
     */
    where?: ReceiptItemWhereInput
    /**
     * Limit how many ReceiptItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ReceiptItem upsert
   */
  export type ReceiptItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ReceiptItem to update in case it exists.
     */
    where: ReceiptItemWhereUniqueInput
    /**
     * In case the ReceiptItem found by the `where` argument doesn't exist, create a new ReceiptItem with this data.
     */
    create: XOR<ReceiptItemCreateInput, ReceiptItemUncheckedCreateInput>
    /**
     * In case the ReceiptItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReceiptItemUpdateInput, ReceiptItemUncheckedUpdateInput>
  }

  /**
   * ReceiptItem delete
   */
  export type ReceiptItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    /**
     * Filter which ReceiptItem to delete.
     */
    where: ReceiptItemWhereUniqueInput
  }

  /**
   * ReceiptItem deleteMany
   */
  export type ReceiptItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReceiptItems to delete
     */
    where?: ReceiptItemWhereInput
    /**
     * Limit how many ReceiptItems to delete.
     */
    limit?: number
  }

  /**
   * ReceiptItem.product
   */
  export type ReceiptItem$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * ReceiptItem.priceRecords
   */
  export type ReceiptItem$priceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    where?: PriceRecordWhereInput
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    cursor?: PriceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceRecordScalarFieldEnum | PriceRecordScalarFieldEnum[]
  }

  /**
   * ReceiptItem without action
   */
  export type ReceiptItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    normalizedName: string | null
    brand: string | null
    category: string | null
    unit: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    normalizedName: string | null
    brand: string | null
    category: string | null
    unit: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    normalizedName: number
    brand: number
    category: number
    unit: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    normalizedName?: true
    brand?: true
    category?: true
    unit?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    normalizedName?: true
    brand?: true
    category?: true
    unit?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    normalizedName?: true
    brand?: true
    category?: true
    unit?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    normalizedName: string
    brand: string | null
    category: string | null
    unit: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    category?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    receiptItems?: boolean | Product$receiptItemsArgs<ExtArgs>
    priceRecords?: boolean | Product$priceRecordsArgs<ExtArgs>
    shoppingListItems?: boolean | Product$shoppingListItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    category?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    category?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    normalizedName?: boolean
    brand?: boolean
    category?: boolean
    unit?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "normalizedName" | "brand" | "category" | "unit" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    receiptItems?: boolean | Product$receiptItemsArgs<ExtArgs>
    priceRecords?: boolean | Product$priceRecordsArgs<ExtArgs>
    shoppingListItems?: boolean | Product$shoppingListItemsArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      receiptItems: Prisma.$ReceiptItemPayload<ExtArgs>[]
      priceRecords: Prisma.$PriceRecordPayload<ExtArgs>[]
      shoppingListItems: Prisma.$ShoppingListItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      normalizedName: string
      brand: string | null
      category: string | null
      unit: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    receiptItems<T extends Product$receiptItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$receiptItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceRecords<T extends Product$priceRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Product$priceRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shoppingListItems<T extends Product$shoppingListItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$shoppingListItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly normalizedName: FieldRef<"Product", 'String'>
    readonly brand: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly unit: FieldRef<"Product", 'String'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.receiptItems
   */
  export type Product$receiptItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    where?: ReceiptItemWhereInput
    orderBy?: ReceiptItemOrderByWithRelationInput | ReceiptItemOrderByWithRelationInput[]
    cursor?: ReceiptItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReceiptItemScalarFieldEnum | ReceiptItemScalarFieldEnum[]
  }

  /**
   * Product.priceRecords
   */
  export type Product$priceRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    where?: PriceRecordWhereInput
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    cursor?: PriceRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PriceRecordScalarFieldEnum | PriceRecordScalarFieldEnum[]
  }

  /**
   * Product.shoppingListItems
   */
  export type Product$shoppingListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    where?: ShoppingListItemWhereInput
    orderBy?: ShoppingListItemOrderByWithRelationInput | ShoppingListItemOrderByWithRelationInput[]
    cursor?: ShoppingListItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShoppingListItemScalarFieldEnum | ShoppingListItemScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model PriceRecord
   */

  export type AggregatePriceRecord = {
    _count: PriceRecordCountAggregateOutputType | null
    _avg: PriceRecordAvgAggregateOutputType | null
    _sum: PriceRecordSumAggregateOutputType | null
    _min: PriceRecordMinAggregateOutputType | null
    _max: PriceRecordMaxAggregateOutputType | null
  }

  export type PriceRecordAvgAggregateOutputType = {
    price: number | null
  }

  export type PriceRecordSumAggregateOutputType = {
    price: number | null
  }

  export type PriceRecordMinAggregateOutputType = {
    id: string | null
    productId: string | null
    marketId: string | null
    receiptItemId: string | null
    price: number | null
    observedAt: Date | null
    createdAt: Date | null
  }

  export type PriceRecordMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    marketId: string | null
    receiptItemId: string | null
    price: number | null
    observedAt: Date | null
    createdAt: Date | null
  }

  export type PriceRecordCountAggregateOutputType = {
    id: number
    productId: number
    marketId: number
    receiptItemId: number
    price: number
    observedAt: number
    createdAt: number
    _all: number
  }


  export type PriceRecordAvgAggregateInputType = {
    price?: true
  }

  export type PriceRecordSumAggregateInputType = {
    price?: true
  }

  export type PriceRecordMinAggregateInputType = {
    id?: true
    productId?: true
    marketId?: true
    receiptItemId?: true
    price?: true
    observedAt?: true
    createdAt?: true
  }

  export type PriceRecordMaxAggregateInputType = {
    id?: true
    productId?: true
    marketId?: true
    receiptItemId?: true
    price?: true
    observedAt?: true
    createdAt?: true
  }

  export type PriceRecordCountAggregateInputType = {
    id?: true
    productId?: true
    marketId?: true
    receiptItemId?: true
    price?: true
    observedAt?: true
    createdAt?: true
    _all?: true
  }

  export type PriceRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceRecord to aggregate.
     */
    where?: PriceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceRecords to fetch.
     */
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PriceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PriceRecords
    **/
    _count?: true | PriceRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PriceRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PriceRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PriceRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PriceRecordMaxAggregateInputType
  }

  export type GetPriceRecordAggregateType<T extends PriceRecordAggregateArgs> = {
        [P in keyof T & keyof AggregatePriceRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePriceRecord[P]>
      : GetScalarType<T[P], AggregatePriceRecord[P]>
  }




  export type PriceRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PriceRecordWhereInput
    orderBy?: PriceRecordOrderByWithAggregationInput | PriceRecordOrderByWithAggregationInput[]
    by: PriceRecordScalarFieldEnum[] | PriceRecordScalarFieldEnum
    having?: PriceRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PriceRecordCountAggregateInputType | true
    _avg?: PriceRecordAvgAggregateInputType
    _sum?: PriceRecordSumAggregateInputType
    _min?: PriceRecordMinAggregateInputType
    _max?: PriceRecordMaxAggregateInputType
  }

  export type PriceRecordGroupByOutputType = {
    id: string
    productId: string
    marketId: string
    receiptItemId: string | null
    price: number
    observedAt: Date
    createdAt: Date
    _count: PriceRecordCountAggregateOutputType | null
    _avg: PriceRecordAvgAggregateOutputType | null
    _sum: PriceRecordSumAggregateOutputType | null
    _min: PriceRecordMinAggregateOutputType | null
    _max: PriceRecordMaxAggregateOutputType | null
  }

  type GetPriceRecordGroupByPayload<T extends PriceRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PriceRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PriceRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PriceRecordGroupByOutputType[P]>
            : GetScalarType<T[P], PriceRecordGroupByOutputType[P]>
        }
      >
    >


  export type PriceRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    marketId?: boolean
    receiptItemId?: boolean
    price?: boolean
    observedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    receiptItem?: boolean | PriceRecord$receiptItemArgs<ExtArgs>
  }, ExtArgs["result"]["priceRecord"]>

  export type PriceRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    marketId?: boolean
    receiptItemId?: boolean
    price?: boolean
    observedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    receiptItem?: boolean | PriceRecord$receiptItemArgs<ExtArgs>
  }, ExtArgs["result"]["priceRecord"]>

  export type PriceRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    marketId?: boolean
    receiptItemId?: boolean
    price?: boolean
    observedAt?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    receiptItem?: boolean | PriceRecord$receiptItemArgs<ExtArgs>
  }, ExtArgs["result"]["priceRecord"]>

  export type PriceRecordSelectScalar = {
    id?: boolean
    productId?: boolean
    marketId?: boolean
    receiptItemId?: boolean
    price?: boolean
    observedAt?: boolean
    createdAt?: boolean
  }

  export type PriceRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "marketId" | "receiptItemId" | "price" | "observedAt" | "createdAt", ExtArgs["result"]["priceRecord"]>
  export type PriceRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    receiptItem?: boolean | PriceRecord$receiptItemArgs<ExtArgs>
  }
  export type PriceRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    receiptItem?: boolean | PriceRecord$receiptItemArgs<ExtArgs>
  }
  export type PriceRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    market?: boolean | MarketDefaultArgs<ExtArgs>
    receiptItem?: boolean | PriceRecord$receiptItemArgs<ExtArgs>
  }

  export type $PriceRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PriceRecord"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      market: Prisma.$MarketPayload<ExtArgs>
      receiptItem: Prisma.$ReceiptItemPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      marketId: string
      receiptItemId: string | null
      price: number
      observedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["priceRecord"]>
    composites: {}
  }

  type PriceRecordGetPayload<S extends boolean | null | undefined | PriceRecordDefaultArgs> = $Result.GetResult<Prisma.$PriceRecordPayload, S>

  type PriceRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PriceRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PriceRecordCountAggregateInputType | true
    }

  export interface PriceRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PriceRecord'], meta: { name: 'PriceRecord' } }
    /**
     * Find zero or one PriceRecord that matches the filter.
     * @param {PriceRecordFindUniqueArgs} args - Arguments to find a PriceRecord
     * @example
     * // Get one PriceRecord
     * const priceRecord = await prisma.priceRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PriceRecordFindUniqueArgs>(args: SelectSubset<T, PriceRecordFindUniqueArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PriceRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PriceRecordFindUniqueOrThrowArgs} args - Arguments to find a PriceRecord
     * @example
     * // Get one PriceRecord
     * const priceRecord = await prisma.priceRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PriceRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, PriceRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordFindFirstArgs} args - Arguments to find a PriceRecord
     * @example
     * // Get one PriceRecord
     * const priceRecord = await prisma.priceRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PriceRecordFindFirstArgs>(args?: SelectSubset<T, PriceRecordFindFirstArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PriceRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordFindFirstOrThrowArgs} args - Arguments to find a PriceRecord
     * @example
     * // Get one PriceRecord
     * const priceRecord = await prisma.priceRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PriceRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, PriceRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PriceRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PriceRecords
     * const priceRecords = await prisma.priceRecord.findMany()
     * 
     * // Get first 10 PriceRecords
     * const priceRecords = await prisma.priceRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const priceRecordWithIdOnly = await prisma.priceRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PriceRecordFindManyArgs>(args?: SelectSubset<T, PriceRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PriceRecord.
     * @param {PriceRecordCreateArgs} args - Arguments to create a PriceRecord.
     * @example
     * // Create one PriceRecord
     * const PriceRecord = await prisma.priceRecord.create({
     *   data: {
     *     // ... data to create a PriceRecord
     *   }
     * })
     * 
     */
    create<T extends PriceRecordCreateArgs>(args: SelectSubset<T, PriceRecordCreateArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PriceRecords.
     * @param {PriceRecordCreateManyArgs} args - Arguments to create many PriceRecords.
     * @example
     * // Create many PriceRecords
     * const priceRecord = await prisma.priceRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PriceRecordCreateManyArgs>(args?: SelectSubset<T, PriceRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PriceRecords and returns the data saved in the database.
     * @param {PriceRecordCreateManyAndReturnArgs} args - Arguments to create many PriceRecords.
     * @example
     * // Create many PriceRecords
     * const priceRecord = await prisma.priceRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PriceRecords and only return the `id`
     * const priceRecordWithIdOnly = await prisma.priceRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PriceRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, PriceRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PriceRecord.
     * @param {PriceRecordDeleteArgs} args - Arguments to delete one PriceRecord.
     * @example
     * // Delete one PriceRecord
     * const PriceRecord = await prisma.priceRecord.delete({
     *   where: {
     *     // ... filter to delete one PriceRecord
     *   }
     * })
     * 
     */
    delete<T extends PriceRecordDeleteArgs>(args: SelectSubset<T, PriceRecordDeleteArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PriceRecord.
     * @param {PriceRecordUpdateArgs} args - Arguments to update one PriceRecord.
     * @example
     * // Update one PriceRecord
     * const priceRecord = await prisma.priceRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PriceRecordUpdateArgs>(args: SelectSubset<T, PriceRecordUpdateArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PriceRecords.
     * @param {PriceRecordDeleteManyArgs} args - Arguments to filter PriceRecords to delete.
     * @example
     * // Delete a few PriceRecords
     * const { count } = await prisma.priceRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PriceRecordDeleteManyArgs>(args?: SelectSubset<T, PriceRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PriceRecords
     * const priceRecord = await prisma.priceRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PriceRecordUpdateManyArgs>(args: SelectSubset<T, PriceRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PriceRecords and returns the data updated in the database.
     * @param {PriceRecordUpdateManyAndReturnArgs} args - Arguments to update many PriceRecords.
     * @example
     * // Update many PriceRecords
     * const priceRecord = await prisma.priceRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PriceRecords and only return the `id`
     * const priceRecordWithIdOnly = await prisma.priceRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PriceRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, PriceRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PriceRecord.
     * @param {PriceRecordUpsertArgs} args - Arguments to update or create a PriceRecord.
     * @example
     * // Update or create a PriceRecord
     * const priceRecord = await prisma.priceRecord.upsert({
     *   create: {
     *     // ... data to create a PriceRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PriceRecord we want to update
     *   }
     * })
     */
    upsert<T extends PriceRecordUpsertArgs>(args: SelectSubset<T, PriceRecordUpsertArgs<ExtArgs>>): Prisma__PriceRecordClient<$Result.GetResult<Prisma.$PriceRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PriceRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordCountArgs} args - Arguments to filter PriceRecords to count.
     * @example
     * // Count the number of PriceRecords
     * const count = await prisma.priceRecord.count({
     *   where: {
     *     // ... the filter for the PriceRecords we want to count
     *   }
     * })
    **/
    count<T extends PriceRecordCountArgs>(
      args?: Subset<T, PriceRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PriceRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PriceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PriceRecordAggregateArgs>(args: Subset<T, PriceRecordAggregateArgs>): Prisma.PrismaPromise<GetPriceRecordAggregateType<T>>

    /**
     * Group by PriceRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PriceRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PriceRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PriceRecordGroupByArgs['orderBy'] }
        : { orderBy?: PriceRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PriceRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriceRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PriceRecord model
   */
  readonly fields: PriceRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PriceRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PriceRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    market<T extends MarketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MarketDefaultArgs<ExtArgs>>): Prisma__MarketClient<$Result.GetResult<Prisma.$MarketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiptItem<T extends PriceRecord$receiptItemArgs<ExtArgs> = {}>(args?: Subset<T, PriceRecord$receiptItemArgs<ExtArgs>>): Prisma__ReceiptItemClient<$Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PriceRecord model
   */
  interface PriceRecordFieldRefs {
    readonly id: FieldRef<"PriceRecord", 'String'>
    readonly productId: FieldRef<"PriceRecord", 'String'>
    readonly marketId: FieldRef<"PriceRecord", 'String'>
    readonly receiptItemId: FieldRef<"PriceRecord", 'String'>
    readonly price: FieldRef<"PriceRecord", 'Float'>
    readonly observedAt: FieldRef<"PriceRecord", 'DateTime'>
    readonly createdAt: FieldRef<"PriceRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PriceRecord findUnique
   */
  export type PriceRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * Filter, which PriceRecord to fetch.
     */
    where: PriceRecordWhereUniqueInput
  }

  /**
   * PriceRecord findUniqueOrThrow
   */
  export type PriceRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * Filter, which PriceRecord to fetch.
     */
    where: PriceRecordWhereUniqueInput
  }

  /**
   * PriceRecord findFirst
   */
  export type PriceRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * Filter, which PriceRecord to fetch.
     */
    where?: PriceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceRecords to fetch.
     */
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceRecords.
     */
    cursor?: PriceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceRecords.
     */
    distinct?: PriceRecordScalarFieldEnum | PriceRecordScalarFieldEnum[]
  }

  /**
   * PriceRecord findFirstOrThrow
   */
  export type PriceRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * Filter, which PriceRecord to fetch.
     */
    where?: PriceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceRecords to fetch.
     */
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PriceRecords.
     */
    cursor?: PriceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceRecords.
     */
    distinct?: PriceRecordScalarFieldEnum | PriceRecordScalarFieldEnum[]
  }

  /**
   * PriceRecord findMany
   */
  export type PriceRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * Filter, which PriceRecords to fetch.
     */
    where?: PriceRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PriceRecords to fetch.
     */
    orderBy?: PriceRecordOrderByWithRelationInput | PriceRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PriceRecords.
     */
    cursor?: PriceRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PriceRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PriceRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PriceRecords.
     */
    distinct?: PriceRecordScalarFieldEnum | PriceRecordScalarFieldEnum[]
  }

  /**
   * PriceRecord create
   */
  export type PriceRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a PriceRecord.
     */
    data: XOR<PriceRecordCreateInput, PriceRecordUncheckedCreateInput>
  }

  /**
   * PriceRecord createMany
   */
  export type PriceRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PriceRecords.
     */
    data: PriceRecordCreateManyInput | PriceRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PriceRecord createManyAndReturn
   */
  export type PriceRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * The data used to create many PriceRecords.
     */
    data: PriceRecordCreateManyInput | PriceRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceRecord update
   */
  export type PriceRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a PriceRecord.
     */
    data: XOR<PriceRecordUpdateInput, PriceRecordUncheckedUpdateInput>
    /**
     * Choose, which PriceRecord to update.
     */
    where: PriceRecordWhereUniqueInput
  }

  /**
   * PriceRecord updateMany
   */
  export type PriceRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PriceRecords.
     */
    data: XOR<PriceRecordUpdateManyMutationInput, PriceRecordUncheckedUpdateManyInput>
    /**
     * Filter which PriceRecords to update
     */
    where?: PriceRecordWhereInput
    /**
     * Limit how many PriceRecords to update.
     */
    limit?: number
  }

  /**
   * PriceRecord updateManyAndReturn
   */
  export type PriceRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * The data used to update PriceRecords.
     */
    data: XOR<PriceRecordUpdateManyMutationInput, PriceRecordUncheckedUpdateManyInput>
    /**
     * Filter which PriceRecords to update
     */
    where?: PriceRecordWhereInput
    /**
     * Limit how many PriceRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PriceRecord upsert
   */
  export type PriceRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the PriceRecord to update in case it exists.
     */
    where: PriceRecordWhereUniqueInput
    /**
     * In case the PriceRecord found by the `where` argument doesn't exist, create a new PriceRecord with this data.
     */
    create: XOR<PriceRecordCreateInput, PriceRecordUncheckedCreateInput>
    /**
     * In case the PriceRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PriceRecordUpdateInput, PriceRecordUncheckedUpdateInput>
  }

  /**
   * PriceRecord delete
   */
  export type PriceRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
    /**
     * Filter which PriceRecord to delete.
     */
    where: PriceRecordWhereUniqueInput
  }

  /**
   * PriceRecord deleteMany
   */
  export type PriceRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PriceRecords to delete
     */
    where?: PriceRecordWhereInput
    /**
     * Limit how many PriceRecords to delete.
     */
    limit?: number
  }

  /**
   * PriceRecord.receiptItem
   */
  export type PriceRecord$receiptItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReceiptItem
     */
    select?: ReceiptItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReceiptItem
     */
    omit?: ReceiptItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReceiptItemInclude<ExtArgs> | null
    where?: ReceiptItemWhereInput
  }

  /**
   * PriceRecord without action
   */
  export type PriceRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PriceRecord
     */
    select?: PriceRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PriceRecord
     */
    omit?: PriceRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PriceRecordInclude<ExtArgs> | null
  }


  /**
   * Model ShoppingList
   */

  export type AggregateShoppingList = {
    _count: ShoppingListCountAggregateOutputType | null
    _min: ShoppingListMinAggregateOutputType | null
    _max: ShoppingListMaxAggregateOutputType | null
  }

  export type ShoppingListMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShoppingListMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShoppingListCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShoppingListMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShoppingListMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShoppingListCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShoppingListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShoppingList to aggregate.
     */
    where?: ShoppingListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingLists to fetch.
     */
    orderBy?: ShoppingListOrderByWithRelationInput | ShoppingListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShoppingListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShoppingLists
    **/
    _count?: true | ShoppingListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShoppingListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShoppingListMaxAggregateInputType
  }

  export type GetShoppingListAggregateType<T extends ShoppingListAggregateArgs> = {
        [P in keyof T & keyof AggregateShoppingList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShoppingList[P]>
      : GetScalarType<T[P], AggregateShoppingList[P]>
  }




  export type ShoppingListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShoppingListWhereInput
    orderBy?: ShoppingListOrderByWithAggregationInput | ShoppingListOrderByWithAggregationInput[]
    by: ShoppingListScalarFieldEnum[] | ShoppingListScalarFieldEnum
    having?: ShoppingListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShoppingListCountAggregateInputType | true
    _min?: ShoppingListMinAggregateInputType
    _max?: ShoppingListMaxAggregateInputType
  }

  export type ShoppingListGroupByOutputType = {
    id: string
    userId: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: ShoppingListCountAggregateOutputType | null
    _min: ShoppingListMinAggregateOutputType | null
    _max: ShoppingListMaxAggregateOutputType | null
  }

  type GetShoppingListGroupByPayload<T extends ShoppingListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShoppingListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShoppingListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShoppingListGroupByOutputType[P]>
            : GetScalarType<T[P], ShoppingListGroupByOutputType[P]>
        }
      >
    >


  export type ShoppingListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | ShoppingList$itemsArgs<ExtArgs>
    _count?: boolean | ShoppingListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shoppingList"]>

  export type ShoppingListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shoppingList"]>

  export type ShoppingListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shoppingList"]>

  export type ShoppingListSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShoppingListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["shoppingList"]>
  export type ShoppingListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | ShoppingList$itemsArgs<ExtArgs>
    _count?: boolean | ShoppingListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShoppingListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ShoppingListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ShoppingListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShoppingList"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$ShoppingListItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shoppingList"]>
    composites: {}
  }

  type ShoppingListGetPayload<S extends boolean | null | undefined | ShoppingListDefaultArgs> = $Result.GetResult<Prisma.$ShoppingListPayload, S>

  type ShoppingListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShoppingListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShoppingListCountAggregateInputType | true
    }

  export interface ShoppingListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShoppingList'], meta: { name: 'ShoppingList' } }
    /**
     * Find zero or one ShoppingList that matches the filter.
     * @param {ShoppingListFindUniqueArgs} args - Arguments to find a ShoppingList
     * @example
     * // Get one ShoppingList
     * const shoppingList = await prisma.shoppingList.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShoppingListFindUniqueArgs>(args: SelectSubset<T, ShoppingListFindUniqueArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShoppingList that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShoppingListFindUniqueOrThrowArgs} args - Arguments to find a ShoppingList
     * @example
     * // Get one ShoppingList
     * const shoppingList = await prisma.shoppingList.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShoppingListFindUniqueOrThrowArgs>(args: SelectSubset<T, ShoppingListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShoppingList that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListFindFirstArgs} args - Arguments to find a ShoppingList
     * @example
     * // Get one ShoppingList
     * const shoppingList = await prisma.shoppingList.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShoppingListFindFirstArgs>(args?: SelectSubset<T, ShoppingListFindFirstArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShoppingList that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListFindFirstOrThrowArgs} args - Arguments to find a ShoppingList
     * @example
     * // Get one ShoppingList
     * const shoppingList = await prisma.shoppingList.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShoppingListFindFirstOrThrowArgs>(args?: SelectSubset<T, ShoppingListFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShoppingLists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShoppingLists
     * const shoppingLists = await prisma.shoppingList.findMany()
     * 
     * // Get first 10 ShoppingLists
     * const shoppingLists = await prisma.shoppingList.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shoppingListWithIdOnly = await prisma.shoppingList.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShoppingListFindManyArgs>(args?: SelectSubset<T, ShoppingListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShoppingList.
     * @param {ShoppingListCreateArgs} args - Arguments to create a ShoppingList.
     * @example
     * // Create one ShoppingList
     * const ShoppingList = await prisma.shoppingList.create({
     *   data: {
     *     // ... data to create a ShoppingList
     *   }
     * })
     * 
     */
    create<T extends ShoppingListCreateArgs>(args: SelectSubset<T, ShoppingListCreateArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShoppingLists.
     * @param {ShoppingListCreateManyArgs} args - Arguments to create many ShoppingLists.
     * @example
     * // Create many ShoppingLists
     * const shoppingList = await prisma.shoppingList.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShoppingListCreateManyArgs>(args?: SelectSubset<T, ShoppingListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShoppingLists and returns the data saved in the database.
     * @param {ShoppingListCreateManyAndReturnArgs} args - Arguments to create many ShoppingLists.
     * @example
     * // Create many ShoppingLists
     * const shoppingList = await prisma.shoppingList.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShoppingLists and only return the `id`
     * const shoppingListWithIdOnly = await prisma.shoppingList.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShoppingListCreateManyAndReturnArgs>(args?: SelectSubset<T, ShoppingListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShoppingList.
     * @param {ShoppingListDeleteArgs} args - Arguments to delete one ShoppingList.
     * @example
     * // Delete one ShoppingList
     * const ShoppingList = await prisma.shoppingList.delete({
     *   where: {
     *     // ... filter to delete one ShoppingList
     *   }
     * })
     * 
     */
    delete<T extends ShoppingListDeleteArgs>(args: SelectSubset<T, ShoppingListDeleteArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShoppingList.
     * @param {ShoppingListUpdateArgs} args - Arguments to update one ShoppingList.
     * @example
     * // Update one ShoppingList
     * const shoppingList = await prisma.shoppingList.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShoppingListUpdateArgs>(args: SelectSubset<T, ShoppingListUpdateArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShoppingLists.
     * @param {ShoppingListDeleteManyArgs} args - Arguments to filter ShoppingLists to delete.
     * @example
     * // Delete a few ShoppingLists
     * const { count } = await prisma.shoppingList.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShoppingListDeleteManyArgs>(args?: SelectSubset<T, ShoppingListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShoppingLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShoppingLists
     * const shoppingList = await prisma.shoppingList.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShoppingListUpdateManyArgs>(args: SelectSubset<T, ShoppingListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShoppingLists and returns the data updated in the database.
     * @param {ShoppingListUpdateManyAndReturnArgs} args - Arguments to update many ShoppingLists.
     * @example
     * // Update many ShoppingLists
     * const shoppingList = await prisma.shoppingList.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShoppingLists and only return the `id`
     * const shoppingListWithIdOnly = await prisma.shoppingList.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShoppingListUpdateManyAndReturnArgs>(args: SelectSubset<T, ShoppingListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShoppingList.
     * @param {ShoppingListUpsertArgs} args - Arguments to update or create a ShoppingList.
     * @example
     * // Update or create a ShoppingList
     * const shoppingList = await prisma.shoppingList.upsert({
     *   create: {
     *     // ... data to create a ShoppingList
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShoppingList we want to update
     *   }
     * })
     */
    upsert<T extends ShoppingListUpsertArgs>(args: SelectSubset<T, ShoppingListUpsertArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShoppingLists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListCountArgs} args - Arguments to filter ShoppingLists to count.
     * @example
     * // Count the number of ShoppingLists
     * const count = await prisma.shoppingList.count({
     *   where: {
     *     // ... the filter for the ShoppingLists we want to count
     *   }
     * })
    **/
    count<T extends ShoppingListCountArgs>(
      args?: Subset<T, ShoppingListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShoppingListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShoppingList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShoppingListAggregateArgs>(args: Subset<T, ShoppingListAggregateArgs>): Prisma.PrismaPromise<GetShoppingListAggregateType<T>>

    /**
     * Group by ShoppingList.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShoppingListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShoppingListGroupByArgs['orderBy'] }
        : { orderBy?: ShoppingListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShoppingListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShoppingListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShoppingList model
   */
  readonly fields: ShoppingListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShoppingList.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShoppingListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends ShoppingList$itemsArgs<ExtArgs> = {}>(args?: Subset<T, ShoppingList$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShoppingList model
   */
  interface ShoppingListFieldRefs {
    readonly id: FieldRef<"ShoppingList", 'String'>
    readonly userId: FieldRef<"ShoppingList", 'String'>
    readonly name: FieldRef<"ShoppingList", 'String'>
    readonly createdAt: FieldRef<"ShoppingList", 'DateTime'>
    readonly updatedAt: FieldRef<"ShoppingList", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShoppingList findUnique
   */
  export type ShoppingListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingList to fetch.
     */
    where: ShoppingListWhereUniqueInput
  }

  /**
   * ShoppingList findUniqueOrThrow
   */
  export type ShoppingListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingList to fetch.
     */
    where: ShoppingListWhereUniqueInput
  }

  /**
   * ShoppingList findFirst
   */
  export type ShoppingListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingList to fetch.
     */
    where?: ShoppingListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingLists to fetch.
     */
    orderBy?: ShoppingListOrderByWithRelationInput | ShoppingListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShoppingLists.
     */
    cursor?: ShoppingListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShoppingLists.
     */
    distinct?: ShoppingListScalarFieldEnum | ShoppingListScalarFieldEnum[]
  }

  /**
   * ShoppingList findFirstOrThrow
   */
  export type ShoppingListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingList to fetch.
     */
    where?: ShoppingListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingLists to fetch.
     */
    orderBy?: ShoppingListOrderByWithRelationInput | ShoppingListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShoppingLists.
     */
    cursor?: ShoppingListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShoppingLists.
     */
    distinct?: ShoppingListScalarFieldEnum | ShoppingListScalarFieldEnum[]
  }

  /**
   * ShoppingList findMany
   */
  export type ShoppingListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingLists to fetch.
     */
    where?: ShoppingListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingLists to fetch.
     */
    orderBy?: ShoppingListOrderByWithRelationInput | ShoppingListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShoppingLists.
     */
    cursor?: ShoppingListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingLists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingLists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShoppingLists.
     */
    distinct?: ShoppingListScalarFieldEnum | ShoppingListScalarFieldEnum[]
  }

  /**
   * ShoppingList create
   */
  export type ShoppingListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * The data needed to create a ShoppingList.
     */
    data: XOR<ShoppingListCreateInput, ShoppingListUncheckedCreateInput>
  }

  /**
   * ShoppingList createMany
   */
  export type ShoppingListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShoppingLists.
     */
    data: ShoppingListCreateManyInput | ShoppingListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShoppingList createManyAndReturn
   */
  export type ShoppingListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * The data used to create many ShoppingLists.
     */
    data: ShoppingListCreateManyInput | ShoppingListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShoppingList update
   */
  export type ShoppingListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * The data needed to update a ShoppingList.
     */
    data: XOR<ShoppingListUpdateInput, ShoppingListUncheckedUpdateInput>
    /**
     * Choose, which ShoppingList to update.
     */
    where: ShoppingListWhereUniqueInput
  }

  /**
   * ShoppingList updateMany
   */
  export type ShoppingListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShoppingLists.
     */
    data: XOR<ShoppingListUpdateManyMutationInput, ShoppingListUncheckedUpdateManyInput>
    /**
     * Filter which ShoppingLists to update
     */
    where?: ShoppingListWhereInput
    /**
     * Limit how many ShoppingLists to update.
     */
    limit?: number
  }

  /**
   * ShoppingList updateManyAndReturn
   */
  export type ShoppingListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * The data used to update ShoppingLists.
     */
    data: XOR<ShoppingListUpdateManyMutationInput, ShoppingListUncheckedUpdateManyInput>
    /**
     * Filter which ShoppingLists to update
     */
    where?: ShoppingListWhereInput
    /**
     * Limit how many ShoppingLists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShoppingList upsert
   */
  export type ShoppingListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * The filter to search for the ShoppingList to update in case it exists.
     */
    where: ShoppingListWhereUniqueInput
    /**
     * In case the ShoppingList found by the `where` argument doesn't exist, create a new ShoppingList with this data.
     */
    create: XOR<ShoppingListCreateInput, ShoppingListUncheckedCreateInput>
    /**
     * In case the ShoppingList was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShoppingListUpdateInput, ShoppingListUncheckedUpdateInput>
  }

  /**
   * ShoppingList delete
   */
  export type ShoppingListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
    /**
     * Filter which ShoppingList to delete.
     */
    where: ShoppingListWhereUniqueInput
  }

  /**
   * ShoppingList deleteMany
   */
  export type ShoppingListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShoppingLists to delete
     */
    where?: ShoppingListWhereInput
    /**
     * Limit how many ShoppingLists to delete.
     */
    limit?: number
  }

  /**
   * ShoppingList.items
   */
  export type ShoppingList$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    where?: ShoppingListItemWhereInput
    orderBy?: ShoppingListItemOrderByWithRelationInput | ShoppingListItemOrderByWithRelationInput[]
    cursor?: ShoppingListItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShoppingListItemScalarFieldEnum | ShoppingListItemScalarFieldEnum[]
  }

  /**
   * ShoppingList without action
   */
  export type ShoppingListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingList
     */
    select?: ShoppingListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingList
     */
    omit?: ShoppingListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListInclude<ExtArgs> | null
  }


  /**
   * Model ShoppingListItem
   */

  export type AggregateShoppingListItem = {
    _count: ShoppingListItemCountAggregateOutputType | null
    _avg: ShoppingListItemAvgAggregateOutputType | null
    _sum: ShoppingListItemSumAggregateOutputType | null
    _min: ShoppingListItemMinAggregateOutputType | null
    _max: ShoppingListItemMaxAggregateOutputType | null
  }

  export type ShoppingListItemAvgAggregateOutputType = {
    quantity: number | null
  }

  export type ShoppingListItemSumAggregateOutputType = {
    quantity: number | null
  }

  export type ShoppingListItemMinAggregateOutputType = {
    id: string | null
    shoppingListId: string | null
    productId: string | null
    name: string | null
    quantity: number | null
    unit: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShoppingListItemMaxAggregateOutputType = {
    id: string | null
    shoppingListId: string | null
    productId: string | null
    name: string | null
    quantity: number | null
    unit: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShoppingListItemCountAggregateOutputType = {
    id: number
    shoppingListId: number
    productId: number
    name: number
    quantity: number
    unit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShoppingListItemAvgAggregateInputType = {
    quantity?: true
  }

  export type ShoppingListItemSumAggregateInputType = {
    quantity?: true
  }

  export type ShoppingListItemMinAggregateInputType = {
    id?: true
    shoppingListId?: true
    productId?: true
    name?: true
    quantity?: true
    unit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShoppingListItemMaxAggregateInputType = {
    id?: true
    shoppingListId?: true
    productId?: true
    name?: true
    quantity?: true
    unit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShoppingListItemCountAggregateInputType = {
    id?: true
    shoppingListId?: true
    productId?: true
    name?: true
    quantity?: true
    unit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShoppingListItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShoppingListItem to aggregate.
     */
    where?: ShoppingListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingListItems to fetch.
     */
    orderBy?: ShoppingListItemOrderByWithRelationInput | ShoppingListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShoppingListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ShoppingListItems
    **/
    _count?: true | ShoppingListItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShoppingListItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShoppingListItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShoppingListItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShoppingListItemMaxAggregateInputType
  }

  export type GetShoppingListItemAggregateType<T extends ShoppingListItemAggregateArgs> = {
        [P in keyof T & keyof AggregateShoppingListItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShoppingListItem[P]>
      : GetScalarType<T[P], AggregateShoppingListItem[P]>
  }




  export type ShoppingListItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShoppingListItemWhereInput
    orderBy?: ShoppingListItemOrderByWithAggregationInput | ShoppingListItemOrderByWithAggregationInput[]
    by: ShoppingListItemScalarFieldEnum[] | ShoppingListItemScalarFieldEnum
    having?: ShoppingListItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShoppingListItemCountAggregateInputType | true
    _avg?: ShoppingListItemAvgAggregateInputType
    _sum?: ShoppingListItemSumAggregateInputType
    _min?: ShoppingListItemMinAggregateInputType
    _max?: ShoppingListItemMaxAggregateInputType
  }

  export type ShoppingListItemGroupByOutputType = {
    id: string
    shoppingListId: string
    productId: string | null
    name: string
    quantity: number | null
    unit: string | null
    createdAt: Date
    updatedAt: Date
    _count: ShoppingListItemCountAggregateOutputType | null
    _avg: ShoppingListItemAvgAggregateOutputType | null
    _sum: ShoppingListItemSumAggregateOutputType | null
    _min: ShoppingListItemMinAggregateOutputType | null
    _max: ShoppingListItemMaxAggregateOutputType | null
  }

  type GetShoppingListItemGroupByPayload<T extends ShoppingListItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShoppingListItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShoppingListItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShoppingListItemGroupByOutputType[P]>
            : GetScalarType<T[P], ShoppingListItemGroupByOutputType[P]>
        }
      >
    >


  export type ShoppingListItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shoppingListId?: boolean
    productId?: boolean
    name?: boolean
    quantity?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shoppingList?: boolean | ShoppingListDefaultArgs<ExtArgs>
    product?: boolean | ShoppingListItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["shoppingListItem"]>

  export type ShoppingListItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shoppingListId?: boolean
    productId?: boolean
    name?: boolean
    quantity?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shoppingList?: boolean | ShoppingListDefaultArgs<ExtArgs>
    product?: boolean | ShoppingListItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["shoppingListItem"]>

  export type ShoppingListItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shoppingListId?: boolean
    productId?: boolean
    name?: boolean
    quantity?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shoppingList?: boolean | ShoppingListDefaultArgs<ExtArgs>
    product?: boolean | ShoppingListItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["shoppingListItem"]>

  export type ShoppingListItemSelectScalar = {
    id?: boolean
    shoppingListId?: boolean
    productId?: boolean
    name?: boolean
    quantity?: boolean
    unit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShoppingListItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shoppingListId" | "productId" | "name" | "quantity" | "unit" | "createdAt" | "updatedAt", ExtArgs["result"]["shoppingListItem"]>
  export type ShoppingListItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shoppingList?: boolean | ShoppingListDefaultArgs<ExtArgs>
    product?: boolean | ShoppingListItem$productArgs<ExtArgs>
  }
  export type ShoppingListItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shoppingList?: boolean | ShoppingListDefaultArgs<ExtArgs>
    product?: boolean | ShoppingListItem$productArgs<ExtArgs>
  }
  export type ShoppingListItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shoppingList?: boolean | ShoppingListDefaultArgs<ExtArgs>
    product?: boolean | ShoppingListItem$productArgs<ExtArgs>
  }

  export type $ShoppingListItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ShoppingListItem"
    objects: {
      shoppingList: Prisma.$ShoppingListPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      shoppingListId: string
      productId: string | null
      name: string
      quantity: number | null
      unit: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["shoppingListItem"]>
    composites: {}
  }

  type ShoppingListItemGetPayload<S extends boolean | null | undefined | ShoppingListItemDefaultArgs> = $Result.GetResult<Prisma.$ShoppingListItemPayload, S>

  type ShoppingListItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShoppingListItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShoppingListItemCountAggregateInputType | true
    }

  export interface ShoppingListItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ShoppingListItem'], meta: { name: 'ShoppingListItem' } }
    /**
     * Find zero or one ShoppingListItem that matches the filter.
     * @param {ShoppingListItemFindUniqueArgs} args - Arguments to find a ShoppingListItem
     * @example
     * // Get one ShoppingListItem
     * const shoppingListItem = await prisma.shoppingListItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShoppingListItemFindUniqueArgs>(args: SelectSubset<T, ShoppingListItemFindUniqueArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ShoppingListItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShoppingListItemFindUniqueOrThrowArgs} args - Arguments to find a ShoppingListItem
     * @example
     * // Get one ShoppingListItem
     * const shoppingListItem = await prisma.shoppingListItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShoppingListItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ShoppingListItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShoppingListItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemFindFirstArgs} args - Arguments to find a ShoppingListItem
     * @example
     * // Get one ShoppingListItem
     * const shoppingListItem = await prisma.shoppingListItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShoppingListItemFindFirstArgs>(args?: SelectSubset<T, ShoppingListItemFindFirstArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ShoppingListItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemFindFirstOrThrowArgs} args - Arguments to find a ShoppingListItem
     * @example
     * // Get one ShoppingListItem
     * const shoppingListItem = await prisma.shoppingListItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShoppingListItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ShoppingListItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ShoppingListItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShoppingListItems
     * const shoppingListItems = await prisma.shoppingListItem.findMany()
     * 
     * // Get first 10 ShoppingListItems
     * const shoppingListItems = await prisma.shoppingListItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shoppingListItemWithIdOnly = await prisma.shoppingListItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShoppingListItemFindManyArgs>(args?: SelectSubset<T, ShoppingListItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ShoppingListItem.
     * @param {ShoppingListItemCreateArgs} args - Arguments to create a ShoppingListItem.
     * @example
     * // Create one ShoppingListItem
     * const ShoppingListItem = await prisma.shoppingListItem.create({
     *   data: {
     *     // ... data to create a ShoppingListItem
     *   }
     * })
     * 
     */
    create<T extends ShoppingListItemCreateArgs>(args: SelectSubset<T, ShoppingListItemCreateArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ShoppingListItems.
     * @param {ShoppingListItemCreateManyArgs} args - Arguments to create many ShoppingListItems.
     * @example
     * // Create many ShoppingListItems
     * const shoppingListItem = await prisma.shoppingListItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShoppingListItemCreateManyArgs>(args?: SelectSubset<T, ShoppingListItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ShoppingListItems and returns the data saved in the database.
     * @param {ShoppingListItemCreateManyAndReturnArgs} args - Arguments to create many ShoppingListItems.
     * @example
     * // Create many ShoppingListItems
     * const shoppingListItem = await prisma.shoppingListItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ShoppingListItems and only return the `id`
     * const shoppingListItemWithIdOnly = await prisma.shoppingListItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShoppingListItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ShoppingListItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ShoppingListItem.
     * @param {ShoppingListItemDeleteArgs} args - Arguments to delete one ShoppingListItem.
     * @example
     * // Delete one ShoppingListItem
     * const ShoppingListItem = await prisma.shoppingListItem.delete({
     *   where: {
     *     // ... filter to delete one ShoppingListItem
     *   }
     * })
     * 
     */
    delete<T extends ShoppingListItemDeleteArgs>(args: SelectSubset<T, ShoppingListItemDeleteArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ShoppingListItem.
     * @param {ShoppingListItemUpdateArgs} args - Arguments to update one ShoppingListItem.
     * @example
     * // Update one ShoppingListItem
     * const shoppingListItem = await prisma.shoppingListItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShoppingListItemUpdateArgs>(args: SelectSubset<T, ShoppingListItemUpdateArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ShoppingListItems.
     * @param {ShoppingListItemDeleteManyArgs} args - Arguments to filter ShoppingListItems to delete.
     * @example
     * // Delete a few ShoppingListItems
     * const { count } = await prisma.shoppingListItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShoppingListItemDeleteManyArgs>(args?: SelectSubset<T, ShoppingListItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShoppingListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShoppingListItems
     * const shoppingListItem = await prisma.shoppingListItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShoppingListItemUpdateManyArgs>(args: SelectSubset<T, ShoppingListItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ShoppingListItems and returns the data updated in the database.
     * @param {ShoppingListItemUpdateManyAndReturnArgs} args - Arguments to update many ShoppingListItems.
     * @example
     * // Update many ShoppingListItems
     * const shoppingListItem = await prisma.shoppingListItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ShoppingListItems and only return the `id`
     * const shoppingListItemWithIdOnly = await prisma.shoppingListItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ShoppingListItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ShoppingListItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ShoppingListItem.
     * @param {ShoppingListItemUpsertArgs} args - Arguments to update or create a ShoppingListItem.
     * @example
     * // Update or create a ShoppingListItem
     * const shoppingListItem = await prisma.shoppingListItem.upsert({
     *   create: {
     *     // ... data to create a ShoppingListItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShoppingListItem we want to update
     *   }
     * })
     */
    upsert<T extends ShoppingListItemUpsertArgs>(args: SelectSubset<T, ShoppingListItemUpsertArgs<ExtArgs>>): Prisma__ShoppingListItemClient<$Result.GetResult<Prisma.$ShoppingListItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ShoppingListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemCountArgs} args - Arguments to filter ShoppingListItems to count.
     * @example
     * // Count the number of ShoppingListItems
     * const count = await prisma.shoppingListItem.count({
     *   where: {
     *     // ... the filter for the ShoppingListItems we want to count
     *   }
     * })
    **/
    count<T extends ShoppingListItemCountArgs>(
      args?: Subset<T, ShoppingListItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShoppingListItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ShoppingListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShoppingListItemAggregateArgs>(args: Subset<T, ShoppingListItemAggregateArgs>): Prisma.PrismaPromise<GetShoppingListItemAggregateType<T>>

    /**
     * Group by ShoppingListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShoppingListItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShoppingListItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShoppingListItemGroupByArgs['orderBy'] }
        : { orderBy?: ShoppingListItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShoppingListItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShoppingListItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ShoppingListItem model
   */
  readonly fields: ShoppingListItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ShoppingListItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShoppingListItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    shoppingList<T extends ShoppingListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShoppingListDefaultArgs<ExtArgs>>): Prisma__ShoppingListClient<$Result.GetResult<Prisma.$ShoppingListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ShoppingListItem$productArgs<ExtArgs> = {}>(args?: Subset<T, ShoppingListItem$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ShoppingListItem model
   */
  interface ShoppingListItemFieldRefs {
    readonly id: FieldRef<"ShoppingListItem", 'String'>
    readonly shoppingListId: FieldRef<"ShoppingListItem", 'String'>
    readonly productId: FieldRef<"ShoppingListItem", 'String'>
    readonly name: FieldRef<"ShoppingListItem", 'String'>
    readonly quantity: FieldRef<"ShoppingListItem", 'Float'>
    readonly unit: FieldRef<"ShoppingListItem", 'String'>
    readonly createdAt: FieldRef<"ShoppingListItem", 'DateTime'>
    readonly updatedAt: FieldRef<"ShoppingListItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ShoppingListItem findUnique
   */
  export type ShoppingListItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingListItem to fetch.
     */
    where: ShoppingListItemWhereUniqueInput
  }

  /**
   * ShoppingListItem findUniqueOrThrow
   */
  export type ShoppingListItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingListItem to fetch.
     */
    where: ShoppingListItemWhereUniqueInput
  }

  /**
   * ShoppingListItem findFirst
   */
  export type ShoppingListItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingListItem to fetch.
     */
    where?: ShoppingListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingListItems to fetch.
     */
    orderBy?: ShoppingListItemOrderByWithRelationInput | ShoppingListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShoppingListItems.
     */
    cursor?: ShoppingListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShoppingListItems.
     */
    distinct?: ShoppingListItemScalarFieldEnum | ShoppingListItemScalarFieldEnum[]
  }

  /**
   * ShoppingListItem findFirstOrThrow
   */
  export type ShoppingListItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingListItem to fetch.
     */
    where?: ShoppingListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingListItems to fetch.
     */
    orderBy?: ShoppingListItemOrderByWithRelationInput | ShoppingListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ShoppingListItems.
     */
    cursor?: ShoppingListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShoppingListItems.
     */
    distinct?: ShoppingListItemScalarFieldEnum | ShoppingListItemScalarFieldEnum[]
  }

  /**
   * ShoppingListItem findMany
   */
  export type ShoppingListItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * Filter, which ShoppingListItems to fetch.
     */
    where?: ShoppingListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ShoppingListItems to fetch.
     */
    orderBy?: ShoppingListItemOrderByWithRelationInput | ShoppingListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ShoppingListItems.
     */
    cursor?: ShoppingListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ShoppingListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ShoppingListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ShoppingListItems.
     */
    distinct?: ShoppingListItemScalarFieldEnum | ShoppingListItemScalarFieldEnum[]
  }

  /**
   * ShoppingListItem create
   */
  export type ShoppingListItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ShoppingListItem.
     */
    data: XOR<ShoppingListItemCreateInput, ShoppingListItemUncheckedCreateInput>
  }

  /**
   * ShoppingListItem createMany
   */
  export type ShoppingListItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShoppingListItems.
     */
    data: ShoppingListItemCreateManyInput | ShoppingListItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ShoppingListItem createManyAndReturn
   */
  export type ShoppingListItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * The data used to create many ShoppingListItems.
     */
    data: ShoppingListItemCreateManyInput | ShoppingListItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShoppingListItem update
   */
  export type ShoppingListItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ShoppingListItem.
     */
    data: XOR<ShoppingListItemUpdateInput, ShoppingListItemUncheckedUpdateInput>
    /**
     * Choose, which ShoppingListItem to update.
     */
    where: ShoppingListItemWhereUniqueInput
  }

  /**
   * ShoppingListItem updateMany
   */
  export type ShoppingListItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ShoppingListItems.
     */
    data: XOR<ShoppingListItemUpdateManyMutationInput, ShoppingListItemUncheckedUpdateManyInput>
    /**
     * Filter which ShoppingListItems to update
     */
    where?: ShoppingListItemWhereInput
    /**
     * Limit how many ShoppingListItems to update.
     */
    limit?: number
  }

  /**
   * ShoppingListItem updateManyAndReturn
   */
  export type ShoppingListItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * The data used to update ShoppingListItems.
     */
    data: XOR<ShoppingListItemUpdateManyMutationInput, ShoppingListItemUncheckedUpdateManyInput>
    /**
     * Filter which ShoppingListItems to update
     */
    where?: ShoppingListItemWhereInput
    /**
     * Limit how many ShoppingListItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ShoppingListItem upsert
   */
  export type ShoppingListItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ShoppingListItem to update in case it exists.
     */
    where: ShoppingListItemWhereUniqueInput
    /**
     * In case the ShoppingListItem found by the `where` argument doesn't exist, create a new ShoppingListItem with this data.
     */
    create: XOR<ShoppingListItemCreateInput, ShoppingListItemUncheckedCreateInput>
    /**
     * In case the ShoppingListItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShoppingListItemUpdateInput, ShoppingListItemUncheckedUpdateInput>
  }

  /**
   * ShoppingListItem delete
   */
  export type ShoppingListItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
    /**
     * Filter which ShoppingListItem to delete.
     */
    where: ShoppingListItemWhereUniqueInput
  }

  /**
   * ShoppingListItem deleteMany
   */
  export type ShoppingListItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ShoppingListItems to delete
     */
    where?: ShoppingListItemWhereInput
    /**
     * Limit how many ShoppingListItems to delete.
     */
    limit?: number
  }

  /**
   * ShoppingListItem.product
   */
  export type ShoppingListItem$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * ShoppingListItem without action
   */
  export type ShoppingListItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShoppingListItem
     */
    select?: ShoppingListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ShoppingListItem
     */
    omit?: ShoppingListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShoppingListItemInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    used: number
    createdAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "token" | "expiresAt" | "used" | "createdAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      used: boolean
      createdAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly used: FieldRef<"PasswordResetToken", 'Boolean'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    recommendationStrategy: 'recommendationStrategy',
    homeLatitude: 'homeLatitude',
    homeLongitude: 'homeLongitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MarketScalarFieldEnum: {
    id: 'id',
    name: 'name',
    displayName: 'displayName',
    cnpj: 'cnpj',
    address: 'address',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MarketScalarFieldEnum = (typeof MarketScalarFieldEnum)[keyof typeof MarketScalarFieldEnum]


  export const ReceiptScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    marketId: 'marketId',
    externalCode: 'externalCode',
    sourceType: 'sourceType',
    totalAmount: 'totalAmount',
    purchasedAt: 'purchasedAt',
    parsingScore: 'parsingScore',
    parsingWarnings: 'parsingWarnings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReceiptScalarFieldEnum = (typeof ReceiptScalarFieldEnum)[keyof typeof ReceiptScalarFieldEnum]


  export const ReceiptItemScalarFieldEnum: {
    id: 'id',
    receiptId: 'receiptId',
    productId: 'productId',
    nameRaw: 'nameRaw',
    unit: 'unit',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt'
  };

  export type ReceiptItemScalarFieldEnum = (typeof ReceiptItemScalarFieldEnum)[keyof typeof ReceiptItemScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    normalizedName: 'normalizedName',
    brand: 'brand',
    category: 'category',
    unit: 'unit',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const PriceRecordScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    marketId: 'marketId',
    receiptItemId: 'receiptItemId',
    price: 'price',
    observedAt: 'observedAt',
    createdAt: 'createdAt'
  };

  export type PriceRecordScalarFieldEnum = (typeof PriceRecordScalarFieldEnum)[keyof typeof PriceRecordScalarFieldEnum]


  export const ShoppingListScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShoppingListScalarFieldEnum = (typeof ShoppingListScalarFieldEnum)[keyof typeof ShoppingListScalarFieldEnum]


  export const ShoppingListItemScalarFieldEnum: {
    id: 'id',
    shoppingListId: 'shoppingListId',
    productId: 'productId',
    name: 'name',
    quantity: 'quantity',
    unit: 'unit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShoppingListItemScalarFieldEnum = (typeof ShoppingListItemScalarFieldEnum)[keyof typeof ShoppingListItemScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ReceiptSource'
   */
  export type EnumReceiptSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReceiptSource'>
    


  /**
   * Reference to a field of type 'ReceiptSource[]'
   */
  export type ListEnumReceiptSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReceiptSource[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    recommendationStrategy?: StringNullableFilter<"User"> | string | null
    homeLatitude?: FloatNullableFilter<"User"> | number | null
    homeLongitude?: FloatNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    receipts?: ReceiptListRelationFilter
    shoppingLists?: ShoppingListListRelationFilter
    passwordResetToken?: XOR<PasswordResetTokenNullableScalarRelationFilter, PasswordResetTokenWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    recommendationStrategy?: SortOrderInput | SortOrder
    homeLatitude?: SortOrderInput | SortOrder
    homeLongitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    receipts?: ReceiptOrderByRelationAggregateInput
    shoppingLists?: ShoppingListOrderByRelationAggregateInput
    passwordResetToken?: PasswordResetTokenOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    recommendationStrategy?: StringNullableFilter<"User"> | string | null
    homeLatitude?: FloatNullableFilter<"User"> | number | null
    homeLongitude?: FloatNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    receipts?: ReceiptListRelationFilter
    shoppingLists?: ShoppingListListRelationFilter
    passwordResetToken?: XOR<PasswordResetTokenNullableScalarRelationFilter, PasswordResetTokenWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    recommendationStrategy?: SortOrderInput | SortOrder
    homeLatitude?: SortOrderInput | SortOrder
    homeLongitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    recommendationStrategy?: StringNullableWithAggregatesFilter<"User"> | string | null
    homeLatitude?: FloatNullableWithAggregatesFilter<"User"> | number | null
    homeLongitude?: FloatNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MarketWhereInput = {
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    id?: StringFilter<"Market"> | string
    name?: StringFilter<"Market"> | string
    displayName?: StringNullableFilter<"Market"> | string | null
    cnpj?: StringNullableFilter<"Market"> | string | null
    address?: StringNullableFilter<"Market"> | string | null
    city?: StringNullableFilter<"Market"> | string | null
    state?: StringNullableFilter<"Market"> | string | null
    zipCode?: StringNullableFilter<"Market"> | string | null
    latitude?: FloatNullableFilter<"Market"> | number | null
    longitude?: FloatNullableFilter<"Market"> | number | null
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
    receipts?: ReceiptListRelationFilter
    priceRecords?: PriceRecordListRelationFilter
  }

  export type MarketOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrderInput | SortOrder
    cnpj?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    receipts?: ReceiptOrderByRelationAggregateInput
    priceRecords?: PriceRecordOrderByRelationAggregateInput
  }

  export type MarketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cnpj?: string
    AND?: MarketWhereInput | MarketWhereInput[]
    OR?: MarketWhereInput[]
    NOT?: MarketWhereInput | MarketWhereInput[]
    name?: StringFilter<"Market"> | string
    displayName?: StringNullableFilter<"Market"> | string | null
    address?: StringNullableFilter<"Market"> | string | null
    city?: StringNullableFilter<"Market"> | string | null
    state?: StringNullableFilter<"Market"> | string | null
    zipCode?: StringNullableFilter<"Market"> | string | null
    latitude?: FloatNullableFilter<"Market"> | number | null
    longitude?: FloatNullableFilter<"Market"> | number | null
    createdAt?: DateTimeFilter<"Market"> | Date | string
    updatedAt?: DateTimeFilter<"Market"> | Date | string
    receipts?: ReceiptListRelationFilter
    priceRecords?: PriceRecordListRelationFilter
  }, "id" | "cnpj">

  export type MarketOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrderInput | SortOrder
    cnpj?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MarketCountOrderByAggregateInput
    _avg?: MarketAvgOrderByAggregateInput
    _max?: MarketMaxOrderByAggregateInput
    _min?: MarketMinOrderByAggregateInput
    _sum?: MarketSumOrderByAggregateInput
  }

  export type MarketScalarWhereWithAggregatesInput = {
    AND?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    OR?: MarketScalarWhereWithAggregatesInput[]
    NOT?: MarketScalarWhereWithAggregatesInput | MarketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Market"> | string
    name?: StringWithAggregatesFilter<"Market"> | string
    displayName?: StringNullableWithAggregatesFilter<"Market"> | string | null
    cnpj?: StringNullableWithAggregatesFilter<"Market"> | string | null
    address?: StringNullableWithAggregatesFilter<"Market"> | string | null
    city?: StringNullableWithAggregatesFilter<"Market"> | string | null
    state?: StringNullableWithAggregatesFilter<"Market"> | string | null
    zipCode?: StringNullableWithAggregatesFilter<"Market"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Market"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Market"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Market"> | Date | string
  }

  export type ReceiptWhereInput = {
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    id?: StringFilter<"Receipt"> | string
    userId?: StringFilter<"Receipt"> | string
    marketId?: StringFilter<"Receipt"> | string
    externalCode?: StringNullableFilter<"Receipt"> | string | null
    sourceType?: EnumReceiptSourceFilter<"Receipt"> | $Enums.ReceiptSource
    totalAmount?: FloatFilter<"Receipt"> | number
    purchasedAt?: DateTimeFilter<"Receipt"> | Date | string
    parsingScore?: FloatNullableFilter<"Receipt"> | number | null
    parsingWarnings?: StringNullableListFilter<"Receipt">
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeFilter<"Receipt"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    items?: ReceiptItemListRelationFilter
  }

  export type ReceiptOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    externalCode?: SortOrderInput | SortOrder
    sourceType?: SortOrder
    totalAmount?: SortOrder
    purchasedAt?: SortOrder
    parsingScore?: SortOrderInput | SortOrder
    parsingWarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    market?: MarketOrderByWithRelationInput
    items?: ReceiptItemOrderByRelationAggregateInput
  }

  export type ReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalCode?: string
    AND?: ReceiptWhereInput | ReceiptWhereInput[]
    OR?: ReceiptWhereInput[]
    NOT?: ReceiptWhereInput | ReceiptWhereInput[]
    userId?: StringFilter<"Receipt"> | string
    marketId?: StringFilter<"Receipt"> | string
    sourceType?: EnumReceiptSourceFilter<"Receipt"> | $Enums.ReceiptSource
    totalAmount?: FloatFilter<"Receipt"> | number
    purchasedAt?: DateTimeFilter<"Receipt"> | Date | string
    parsingScore?: FloatNullableFilter<"Receipt"> | number | null
    parsingWarnings?: StringNullableListFilter<"Receipt">
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeFilter<"Receipt"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    items?: ReceiptItemListRelationFilter
  }, "id" | "externalCode">

  export type ReceiptOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    externalCode?: SortOrderInput | SortOrder
    sourceType?: SortOrder
    totalAmount?: SortOrder
    purchasedAt?: SortOrder
    parsingScore?: SortOrderInput | SortOrder
    parsingWarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReceiptCountOrderByAggregateInput
    _avg?: ReceiptAvgOrderByAggregateInput
    _max?: ReceiptMaxOrderByAggregateInput
    _min?: ReceiptMinOrderByAggregateInput
    _sum?: ReceiptSumOrderByAggregateInput
  }

  export type ReceiptScalarWhereWithAggregatesInput = {
    AND?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    OR?: ReceiptScalarWhereWithAggregatesInput[]
    NOT?: ReceiptScalarWhereWithAggregatesInput | ReceiptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Receipt"> | string
    userId?: StringWithAggregatesFilter<"Receipt"> | string
    marketId?: StringWithAggregatesFilter<"Receipt"> | string
    externalCode?: StringNullableWithAggregatesFilter<"Receipt"> | string | null
    sourceType?: EnumReceiptSourceWithAggregatesFilter<"Receipt"> | $Enums.ReceiptSource
    totalAmount?: FloatWithAggregatesFilter<"Receipt"> | number
    purchasedAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
    parsingScore?: FloatNullableWithAggregatesFilter<"Receipt"> | number | null
    parsingWarnings?: StringNullableListFilter<"Receipt">
    createdAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Receipt"> | Date | string
  }

  export type ReceiptItemWhereInput = {
    AND?: ReceiptItemWhereInput | ReceiptItemWhereInput[]
    OR?: ReceiptItemWhereInput[]
    NOT?: ReceiptItemWhereInput | ReceiptItemWhereInput[]
    id?: StringFilter<"ReceiptItem"> | string
    receiptId?: StringFilter<"ReceiptItem"> | string
    productId?: StringNullableFilter<"ReceiptItem"> | string | null
    nameRaw?: StringFilter<"ReceiptItem"> | string
    unit?: StringNullableFilter<"ReceiptItem"> | string | null
    quantity?: FloatNullableFilter<"ReceiptItem"> | number | null
    unitPrice?: FloatFilter<"ReceiptItem"> | number
    totalPrice?: FloatNullableFilter<"ReceiptItem"> | number | null
    createdAt?: DateTimeFilter<"ReceiptItem"> | Date | string
    receipt?: XOR<ReceiptScalarRelationFilter, ReceiptWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    priceRecords?: PriceRecordListRelationFilter
  }

  export type ReceiptItemOrderByWithRelationInput = {
    id?: SortOrder
    receiptId?: SortOrder
    productId?: SortOrderInput | SortOrder
    nameRaw?: SortOrder
    unit?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    receipt?: ReceiptOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
    priceRecords?: PriceRecordOrderByRelationAggregateInput
  }

  export type ReceiptItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReceiptItemWhereInput | ReceiptItemWhereInput[]
    OR?: ReceiptItemWhereInput[]
    NOT?: ReceiptItemWhereInput | ReceiptItemWhereInput[]
    receiptId?: StringFilter<"ReceiptItem"> | string
    productId?: StringNullableFilter<"ReceiptItem"> | string | null
    nameRaw?: StringFilter<"ReceiptItem"> | string
    unit?: StringNullableFilter<"ReceiptItem"> | string | null
    quantity?: FloatNullableFilter<"ReceiptItem"> | number | null
    unitPrice?: FloatFilter<"ReceiptItem"> | number
    totalPrice?: FloatNullableFilter<"ReceiptItem"> | number | null
    createdAt?: DateTimeFilter<"ReceiptItem"> | Date | string
    receipt?: XOR<ReceiptScalarRelationFilter, ReceiptWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
    priceRecords?: PriceRecordListRelationFilter
  }, "id">

  export type ReceiptItemOrderByWithAggregationInput = {
    id?: SortOrder
    receiptId?: SortOrder
    productId?: SortOrderInput | SortOrder
    nameRaw?: SortOrder
    unit?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ReceiptItemCountOrderByAggregateInput
    _avg?: ReceiptItemAvgOrderByAggregateInput
    _max?: ReceiptItemMaxOrderByAggregateInput
    _min?: ReceiptItemMinOrderByAggregateInput
    _sum?: ReceiptItemSumOrderByAggregateInput
  }

  export type ReceiptItemScalarWhereWithAggregatesInput = {
    AND?: ReceiptItemScalarWhereWithAggregatesInput | ReceiptItemScalarWhereWithAggregatesInput[]
    OR?: ReceiptItemScalarWhereWithAggregatesInput[]
    NOT?: ReceiptItemScalarWhereWithAggregatesInput | ReceiptItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReceiptItem"> | string
    receiptId?: StringWithAggregatesFilter<"ReceiptItem"> | string
    productId?: StringNullableWithAggregatesFilter<"ReceiptItem"> | string | null
    nameRaw?: StringWithAggregatesFilter<"ReceiptItem"> | string
    unit?: StringNullableWithAggregatesFilter<"ReceiptItem"> | string | null
    quantity?: FloatNullableWithAggregatesFilter<"ReceiptItem"> | number | null
    unitPrice?: FloatWithAggregatesFilter<"ReceiptItem"> | number
    totalPrice?: FloatNullableWithAggregatesFilter<"ReceiptItem"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ReceiptItem"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    normalizedName?: StringFilter<"Product"> | string
    brand?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    unit?: StringNullableFilter<"Product"> | string | null
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    receiptItems?: ReceiptItemListRelationFilter
    priceRecords?: PriceRecordListRelationFilter
    shoppingListItems?: ShoppingListItemListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    receiptItems?: ReceiptItemOrderByRelationAggregateInput
    priceRecords?: PriceRecordOrderByRelationAggregateInput
    shoppingListItems?: ShoppingListItemOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    normalizedName?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    brand?: StringNullableFilter<"Product"> | string | null
    category?: StringNullableFilter<"Product"> | string | null
    unit?: StringNullableFilter<"Product"> | string | null
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    receiptItems?: ReceiptItemListRelationFilter
    priceRecords?: PriceRecordListRelationFilter
    shoppingListItems?: ShoppingListItemListRelationFilter
  }, "id" | "normalizedName">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    normalizedName?: StringWithAggregatesFilter<"Product"> | string
    brand?: StringNullableWithAggregatesFilter<"Product"> | string | null
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    unit?: StringNullableWithAggregatesFilter<"Product"> | string | null
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type PriceRecordWhereInput = {
    AND?: PriceRecordWhereInput | PriceRecordWhereInput[]
    OR?: PriceRecordWhereInput[]
    NOT?: PriceRecordWhereInput | PriceRecordWhereInput[]
    id?: StringFilter<"PriceRecord"> | string
    productId?: StringFilter<"PriceRecord"> | string
    marketId?: StringFilter<"PriceRecord"> | string
    receiptItemId?: StringNullableFilter<"PriceRecord"> | string | null
    price?: FloatFilter<"PriceRecord"> | number
    observedAt?: DateTimeFilter<"PriceRecord"> | Date | string
    createdAt?: DateTimeFilter<"PriceRecord"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    receiptItem?: XOR<ReceiptItemNullableScalarRelationFilter, ReceiptItemWhereInput> | null
  }

  export type PriceRecordOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    marketId?: SortOrder
    receiptItemId?: SortOrderInput | SortOrder
    price?: SortOrder
    observedAt?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    market?: MarketOrderByWithRelationInput
    receiptItem?: ReceiptItemOrderByWithRelationInput
  }

  export type PriceRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PriceRecordWhereInput | PriceRecordWhereInput[]
    OR?: PriceRecordWhereInput[]
    NOT?: PriceRecordWhereInput | PriceRecordWhereInput[]
    productId?: StringFilter<"PriceRecord"> | string
    marketId?: StringFilter<"PriceRecord"> | string
    receiptItemId?: StringNullableFilter<"PriceRecord"> | string | null
    price?: FloatFilter<"PriceRecord"> | number
    observedAt?: DateTimeFilter<"PriceRecord"> | Date | string
    createdAt?: DateTimeFilter<"PriceRecord"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    market?: XOR<MarketScalarRelationFilter, MarketWhereInput>
    receiptItem?: XOR<ReceiptItemNullableScalarRelationFilter, ReceiptItemWhereInput> | null
  }, "id">

  export type PriceRecordOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    marketId?: SortOrder
    receiptItemId?: SortOrderInput | SortOrder
    price?: SortOrder
    observedAt?: SortOrder
    createdAt?: SortOrder
    _count?: PriceRecordCountOrderByAggregateInput
    _avg?: PriceRecordAvgOrderByAggregateInput
    _max?: PriceRecordMaxOrderByAggregateInput
    _min?: PriceRecordMinOrderByAggregateInput
    _sum?: PriceRecordSumOrderByAggregateInput
  }

  export type PriceRecordScalarWhereWithAggregatesInput = {
    AND?: PriceRecordScalarWhereWithAggregatesInput | PriceRecordScalarWhereWithAggregatesInput[]
    OR?: PriceRecordScalarWhereWithAggregatesInput[]
    NOT?: PriceRecordScalarWhereWithAggregatesInput | PriceRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PriceRecord"> | string
    productId?: StringWithAggregatesFilter<"PriceRecord"> | string
    marketId?: StringWithAggregatesFilter<"PriceRecord"> | string
    receiptItemId?: StringNullableWithAggregatesFilter<"PriceRecord"> | string | null
    price?: FloatWithAggregatesFilter<"PriceRecord"> | number
    observedAt?: DateTimeWithAggregatesFilter<"PriceRecord"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PriceRecord"> | Date | string
  }

  export type ShoppingListWhereInput = {
    AND?: ShoppingListWhereInput | ShoppingListWhereInput[]
    OR?: ShoppingListWhereInput[]
    NOT?: ShoppingListWhereInput | ShoppingListWhereInput[]
    id?: StringFilter<"ShoppingList"> | string
    userId?: StringFilter<"ShoppingList"> | string
    name?: StringFilter<"ShoppingList"> | string
    createdAt?: DateTimeFilter<"ShoppingList"> | Date | string
    updatedAt?: DateTimeFilter<"ShoppingList"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: ShoppingListItemListRelationFilter
  }

  export type ShoppingListOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: ShoppingListItemOrderByRelationAggregateInput
  }

  export type ShoppingListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShoppingListWhereInput | ShoppingListWhereInput[]
    OR?: ShoppingListWhereInput[]
    NOT?: ShoppingListWhereInput | ShoppingListWhereInput[]
    userId?: StringFilter<"ShoppingList"> | string
    name?: StringFilter<"ShoppingList"> | string
    createdAt?: DateTimeFilter<"ShoppingList"> | Date | string
    updatedAt?: DateTimeFilter<"ShoppingList"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    items?: ShoppingListItemListRelationFilter
  }, "id">

  export type ShoppingListOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShoppingListCountOrderByAggregateInput
    _max?: ShoppingListMaxOrderByAggregateInput
    _min?: ShoppingListMinOrderByAggregateInput
  }

  export type ShoppingListScalarWhereWithAggregatesInput = {
    AND?: ShoppingListScalarWhereWithAggregatesInput | ShoppingListScalarWhereWithAggregatesInput[]
    OR?: ShoppingListScalarWhereWithAggregatesInput[]
    NOT?: ShoppingListScalarWhereWithAggregatesInput | ShoppingListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShoppingList"> | string
    userId?: StringWithAggregatesFilter<"ShoppingList"> | string
    name?: StringWithAggregatesFilter<"ShoppingList"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ShoppingList"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShoppingList"> | Date | string
  }

  export type ShoppingListItemWhereInput = {
    AND?: ShoppingListItemWhereInput | ShoppingListItemWhereInput[]
    OR?: ShoppingListItemWhereInput[]
    NOT?: ShoppingListItemWhereInput | ShoppingListItemWhereInput[]
    id?: StringFilter<"ShoppingListItem"> | string
    shoppingListId?: StringFilter<"ShoppingListItem"> | string
    productId?: StringNullableFilter<"ShoppingListItem"> | string | null
    name?: StringFilter<"ShoppingListItem"> | string
    quantity?: FloatNullableFilter<"ShoppingListItem"> | number | null
    unit?: StringNullableFilter<"ShoppingListItem"> | string | null
    createdAt?: DateTimeFilter<"ShoppingListItem"> | Date | string
    updatedAt?: DateTimeFilter<"ShoppingListItem"> | Date | string
    shoppingList?: XOR<ShoppingListScalarRelationFilter, ShoppingListWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type ShoppingListItemOrderByWithRelationInput = {
    id?: SortOrder
    shoppingListId?: SortOrder
    productId?: SortOrderInput | SortOrder
    name?: SortOrder
    quantity?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shoppingList?: ShoppingListOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type ShoppingListItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShoppingListItemWhereInput | ShoppingListItemWhereInput[]
    OR?: ShoppingListItemWhereInput[]
    NOT?: ShoppingListItemWhereInput | ShoppingListItemWhereInput[]
    shoppingListId?: StringFilter<"ShoppingListItem"> | string
    productId?: StringNullableFilter<"ShoppingListItem"> | string | null
    name?: StringFilter<"ShoppingListItem"> | string
    quantity?: FloatNullableFilter<"ShoppingListItem"> | number | null
    unit?: StringNullableFilter<"ShoppingListItem"> | string | null
    createdAt?: DateTimeFilter<"ShoppingListItem"> | Date | string
    updatedAt?: DateTimeFilter<"ShoppingListItem"> | Date | string
    shoppingList?: XOR<ShoppingListScalarRelationFilter, ShoppingListWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type ShoppingListItemOrderByWithAggregationInput = {
    id?: SortOrder
    shoppingListId?: SortOrder
    productId?: SortOrderInput | SortOrder
    name?: SortOrder
    quantity?: SortOrderInput | SortOrder
    unit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShoppingListItemCountOrderByAggregateInput
    _avg?: ShoppingListItemAvgOrderByAggregateInput
    _max?: ShoppingListItemMaxOrderByAggregateInput
    _min?: ShoppingListItemMinOrderByAggregateInput
    _sum?: ShoppingListItemSumOrderByAggregateInput
  }

  export type ShoppingListItemScalarWhereWithAggregatesInput = {
    AND?: ShoppingListItemScalarWhereWithAggregatesInput | ShoppingListItemScalarWhereWithAggregatesInput[]
    OR?: ShoppingListItemScalarWhereWithAggregatesInput[]
    NOT?: ShoppingListItemScalarWhereWithAggregatesInput | ShoppingListItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ShoppingListItem"> | string
    shoppingListId?: StringWithAggregatesFilter<"ShoppingListItem"> | string
    productId?: StringNullableWithAggregatesFilter<"ShoppingListItem"> | string | null
    name?: StringWithAggregatesFilter<"ShoppingListItem"> | string
    quantity?: FloatNullableWithAggregatesFilter<"ShoppingListItem"> | number | null
    unit?: StringNullableWithAggregatesFilter<"ShoppingListItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ShoppingListItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ShoppingListItem"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    token?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    used?: BoolFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    used?: BoolWithAggregatesFilter<"PasswordResetToken"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptCreateNestedManyWithoutUserInput
    shoppingLists?: ShoppingListCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptUncheckedCreateNestedManyWithoutUserInput
    shoppingLists?: ShoppingListUncheckedCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUpdateManyWithoutUserNestedInput
    shoppingLists?: ShoppingListUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUncheckedUpdateManyWithoutUserNestedInput
    shoppingLists?: ShoppingListUncheckedUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketCreateInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptCreateNestedManyWithoutMarketInput
    priceRecords?: PriceRecordCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptUncheckedCreateNestedManyWithoutMarketInput
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUpdateManyWithoutMarketNestedInput
    priceRecords?: PriceRecordUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUncheckedUpdateManyWithoutMarketNestedInput
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type MarketCreateManyInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateInput = {
    id?: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReceiptsInput
    market: MarketCreateNestedOneWithoutReceiptsInput
    items?: ReceiptItemCreateNestedManyWithoutReceiptInput
  }

  export type ReceiptUncheckedCreateInput = {
    id?: string
    userId: string
    marketId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReceiptItemUncheckedCreateNestedManyWithoutReceiptInput
  }

  export type ReceiptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReceiptsNestedInput
    market?: MarketUpdateOneRequiredWithoutReceiptsNestedInput
    items?: ReceiptItemUpdateManyWithoutReceiptNestedInput
  }

  export type ReceiptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput
  }

  export type ReceiptCreateManyInput = {
    id?: string
    userId: string
    marketId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptItemCreateInput = {
    id?: string
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    receipt: ReceiptCreateNestedOneWithoutItemsInput
    product?: ProductCreateNestedOneWithoutReceiptItemsInput
    priceRecords?: PriceRecordCreateNestedManyWithoutReceiptItemInput
  }

  export type ReceiptItemUncheckedCreateInput = {
    id?: string
    receiptId: string
    productId?: string | null
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutReceiptItemInput
  }

  export type ReceiptItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt?: ReceiptUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneWithoutReceiptItemsNestedInput
    priceRecords?: PriceRecordUpdateManyWithoutReceiptItemNestedInput
  }

  export type ReceiptItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutReceiptItemNestedInput
  }

  export type ReceiptItemCreateManyInput = {
    id?: string
    receiptId: string
    productId?: string | null
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
  }

  export type ReceiptItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiptItems?: ReceiptItemCreateNestedManyWithoutProductInput
    priceRecords?: PriceRecordCreateNestedManyWithoutProductInput
    shoppingListItems?: ShoppingListItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiptItems?: ReceiptItemUncheckedCreateNestedManyWithoutProductInput
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutProductInput
    shoppingListItems?: ShoppingListItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptItems?: ReceiptItemUpdateManyWithoutProductNestedInput
    priceRecords?: PriceRecordUpdateManyWithoutProductNestedInput
    shoppingListItems?: ShoppingListItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptItems?: ReceiptItemUncheckedUpdateManyWithoutProductNestedInput
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutProductNestedInput
    shoppingListItems?: ShoppingListItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordCreateInput = {
    id?: string
    price: number
    observedAt: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutPriceRecordsInput
    market: MarketCreateNestedOneWithoutPriceRecordsInput
    receiptItem?: ReceiptItemCreateNestedOneWithoutPriceRecordsInput
  }

  export type PriceRecordUncheckedCreateInput = {
    id?: string
    productId: string
    marketId: string
    receiptItemId?: string | null
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type PriceRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPriceRecordsNestedInput
    market?: MarketUpdateOneRequiredWithoutPriceRecordsNestedInput
    receiptItem?: ReceiptItemUpdateOneWithoutPriceRecordsNestedInput
  }

  export type PriceRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    receiptItemId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordCreateManyInput = {
    id?: string
    productId: string
    marketId: string
    receiptItemId?: string | null
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type PriceRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    receiptItemId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutShoppingListsInput
    items?: ShoppingListItemCreateNestedManyWithoutShoppingListInput
  }

  export type ShoppingListUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ShoppingListItemUncheckedCreateNestedManyWithoutShoppingListInput
  }

  export type ShoppingListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutShoppingListsNestedInput
    items?: ShoppingListItemUpdateManyWithoutShoppingListNestedInput
  }

  export type ShoppingListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ShoppingListItemUncheckedUpdateManyWithoutShoppingListNestedInput
  }

  export type ShoppingListCreateManyInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemCreateInput = {
    id?: string
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shoppingList: ShoppingListCreateNestedOneWithoutItemsInput
    product?: ProductCreateNestedOneWithoutShoppingListItemsInput
  }

  export type ShoppingListItemUncheckedCreateInput = {
    id?: string
    shoppingListId: string
    productId?: string | null
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shoppingList?: ShoppingListUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneWithoutShoppingListItemsNestedInput
  }

  export type ShoppingListItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    shoppingListId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemCreateManyInput = {
    id?: string
    shoppingListId: string
    productId?: string | null
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    shoppingListId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPasswordResetTokenInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ReceiptListRelationFilter = {
    every?: ReceiptWhereInput
    some?: ReceiptWhereInput
    none?: ReceiptWhereInput
  }

  export type ShoppingListListRelationFilter = {
    every?: ShoppingListWhereInput
    some?: ShoppingListWhereInput
    none?: ShoppingListWhereInput
  }

  export type PasswordResetTokenNullableScalarRelationFilter = {
    is?: PasswordResetTokenWhereInput | null
    isNot?: PasswordResetTokenWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReceiptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShoppingListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    recommendationStrategy?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    recommendationStrategy?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    recommendationStrategy?: SortOrder
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    homeLatitude?: SortOrder
    homeLongitude?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PriceRecordListRelationFilter = {
    every?: PriceRecordWhereInput
    some?: PriceRecordWhereInput
    none?: PriceRecordWhereInput
  }

  export type PriceRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MarketCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    cnpj?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type MarketMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    cnpj?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    cnpj?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type EnumReceiptSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptSource | EnumReceiptSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptSourceFilter<$PrismaModel> | $Enums.ReceiptSource
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MarketScalarRelationFilter = {
    is?: MarketWhereInput
    isNot?: MarketWhereInput
  }

  export type ReceiptItemListRelationFilter = {
    every?: ReceiptItemWhereInput
    some?: ReceiptItemWhereInput
    none?: ReceiptItemWhereInput
  }

  export type ReceiptItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReceiptCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    externalCode?: SortOrder
    sourceType?: SortOrder
    totalAmount?: SortOrder
    purchasedAt?: SortOrder
    parsingScore?: SortOrder
    parsingWarnings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReceiptAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    parsingScore?: SortOrder
  }

  export type ReceiptMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    externalCode?: SortOrder
    sourceType?: SortOrder
    totalAmount?: SortOrder
    purchasedAt?: SortOrder
    parsingScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReceiptMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    marketId?: SortOrder
    externalCode?: SortOrder
    sourceType?: SortOrder
    totalAmount?: SortOrder
    purchasedAt?: SortOrder
    parsingScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReceiptSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    parsingScore?: SortOrder
  }

  export type EnumReceiptSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptSource | EnumReceiptSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptSourceWithAggregatesFilter<$PrismaModel> | $Enums.ReceiptSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReceiptSourceFilter<$PrismaModel>
    _max?: NestedEnumReceiptSourceFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type ReceiptScalarRelationFilter = {
    is?: ReceiptWhereInput
    isNot?: ReceiptWhereInput
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type ReceiptItemCountOrderByAggregateInput = {
    id?: SortOrder
    receiptId?: SortOrder
    productId?: SortOrder
    nameRaw?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type ReceiptItemMaxOrderByAggregateInput = {
    id?: SortOrder
    receiptId?: SortOrder
    productId?: SortOrder
    nameRaw?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptItemMinOrderByAggregateInput = {
    id?: SortOrder
    receiptId?: SortOrder
    productId?: SortOrder
    nameRaw?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ShoppingListItemListRelationFilter = {
    every?: ShoppingListItemWhereInput
    some?: ShoppingListItemWhereInput
    none?: ShoppingListItemWhereInput
  }

  export type ShoppingListItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    normalizedName?: SortOrder
    brand?: SortOrder
    category?: SortOrder
    unit?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ReceiptItemNullableScalarRelationFilter = {
    is?: ReceiptItemWhereInput | null
    isNot?: ReceiptItemWhereInput | null
  }

  export type PriceRecordCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    marketId?: SortOrder
    receiptItemId?: SortOrder
    price?: SortOrder
    observedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceRecordAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type PriceRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    marketId?: SortOrder
    receiptItemId?: SortOrder
    price?: SortOrder
    observedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceRecordMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    marketId?: SortOrder
    receiptItemId?: SortOrder
    price?: SortOrder
    observedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PriceRecordSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ShoppingListCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShoppingListMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShoppingListMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShoppingListScalarRelationFilter = {
    is?: ShoppingListWhereInput
    isNot?: ShoppingListWhereInput
  }

  export type ShoppingListItemCountOrderByAggregateInput = {
    id?: SortOrder
    shoppingListId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShoppingListItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type ShoppingListItemMaxOrderByAggregateInput = {
    id?: SortOrder
    shoppingListId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShoppingListItemMinOrderByAggregateInput = {
    id?: SortOrder
    shoppingListId?: SortOrder
    productId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShoppingListItemSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type ReceiptCreateNestedManyWithoutUserInput = {
    create?: XOR<ReceiptCreateWithoutUserInput, ReceiptUncheckedCreateWithoutUserInput> | ReceiptCreateWithoutUserInput[] | ReceiptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutUserInput | ReceiptCreateOrConnectWithoutUserInput[]
    createMany?: ReceiptCreateManyUserInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type ShoppingListCreateNestedManyWithoutUserInput = {
    create?: XOR<ShoppingListCreateWithoutUserInput, ShoppingListUncheckedCreateWithoutUserInput> | ShoppingListCreateWithoutUserInput[] | ShoppingListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShoppingListCreateOrConnectWithoutUserInput | ShoppingListCreateOrConnectWithoutUserInput[]
    createMany?: ShoppingListCreateManyUserInputEnvelope
    connect?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    connect?: PasswordResetTokenWhereUniqueInput
  }

  export type ReceiptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReceiptCreateWithoutUserInput, ReceiptUncheckedCreateWithoutUserInput> | ReceiptCreateWithoutUserInput[] | ReceiptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutUserInput | ReceiptCreateOrConnectWithoutUserInput[]
    createMany?: ReceiptCreateManyUserInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type ShoppingListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ShoppingListCreateWithoutUserInput, ShoppingListUncheckedCreateWithoutUserInput> | ShoppingListCreateWithoutUserInput[] | ShoppingListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShoppingListCreateOrConnectWithoutUserInput | ShoppingListCreateOrConnectWithoutUserInput[]
    createMany?: ShoppingListCreateManyUserInputEnvelope
    connect?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    connect?: PasswordResetTokenWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReceiptUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReceiptCreateWithoutUserInput, ReceiptUncheckedCreateWithoutUserInput> | ReceiptCreateWithoutUserInput[] | ReceiptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutUserInput | ReceiptCreateOrConnectWithoutUserInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutUserInput | ReceiptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReceiptCreateManyUserInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutUserInput | ReceiptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutUserInput | ReceiptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type ShoppingListUpdateManyWithoutUserNestedInput = {
    create?: XOR<ShoppingListCreateWithoutUserInput, ShoppingListUncheckedCreateWithoutUserInput> | ShoppingListCreateWithoutUserInput[] | ShoppingListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShoppingListCreateOrConnectWithoutUserInput | ShoppingListCreateOrConnectWithoutUserInput[]
    upsert?: ShoppingListUpsertWithWhereUniqueWithoutUserInput | ShoppingListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ShoppingListCreateManyUserInputEnvelope
    set?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    disconnect?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    delete?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    connect?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    update?: ShoppingListUpdateWithWhereUniqueWithoutUserInput | ShoppingListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ShoppingListUpdateManyWithWhereWithoutUserInput | ShoppingListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ShoppingListScalarWhereInput | ShoppingListScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    upsert?: PasswordResetTokenUpsertWithoutUserInput
    disconnect?: PasswordResetTokenWhereInput | boolean
    delete?: PasswordResetTokenWhereInput | boolean
    connect?: PasswordResetTokenWhereUniqueInput
    update?: XOR<XOR<PasswordResetTokenUpdateToOneWithWhereWithoutUserInput, PasswordResetTokenUpdateWithoutUserInput>, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type ReceiptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReceiptCreateWithoutUserInput, ReceiptUncheckedCreateWithoutUserInput> | ReceiptCreateWithoutUserInput[] | ReceiptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutUserInput | ReceiptCreateOrConnectWithoutUserInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutUserInput | ReceiptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReceiptCreateManyUserInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutUserInput | ReceiptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutUserInput | ReceiptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type ShoppingListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ShoppingListCreateWithoutUserInput, ShoppingListUncheckedCreateWithoutUserInput> | ShoppingListCreateWithoutUserInput[] | ShoppingListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ShoppingListCreateOrConnectWithoutUserInput | ShoppingListCreateOrConnectWithoutUserInput[]
    upsert?: ShoppingListUpsertWithWhereUniqueWithoutUserInput | ShoppingListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ShoppingListCreateManyUserInputEnvelope
    set?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    disconnect?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    delete?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    connect?: ShoppingListWhereUniqueInput | ShoppingListWhereUniqueInput[]
    update?: ShoppingListUpdateWithWhereUniqueWithoutUserInput | ShoppingListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ShoppingListUpdateManyWithWhereWithoutUserInput | ShoppingListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ShoppingListScalarWhereInput | ShoppingListScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput
    upsert?: PasswordResetTokenUpsertWithoutUserInput
    disconnect?: PasswordResetTokenWhereInput | boolean
    delete?: PasswordResetTokenWhereInput | boolean
    connect?: PasswordResetTokenWhereUniqueInput
    update?: XOR<XOR<PasswordResetTokenUpdateToOneWithWhereWithoutUserInput, PasswordResetTokenUpdateWithoutUserInput>, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type ReceiptCreateNestedManyWithoutMarketInput = {
    create?: XOR<ReceiptCreateWithoutMarketInput, ReceiptUncheckedCreateWithoutMarketInput> | ReceiptCreateWithoutMarketInput[] | ReceiptUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutMarketInput | ReceiptCreateOrConnectWithoutMarketInput[]
    createMany?: ReceiptCreateManyMarketInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type PriceRecordCreateNestedManyWithoutMarketInput = {
    create?: XOR<PriceRecordCreateWithoutMarketInput, PriceRecordUncheckedCreateWithoutMarketInput> | PriceRecordCreateWithoutMarketInput[] | PriceRecordUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutMarketInput | PriceRecordCreateOrConnectWithoutMarketInput[]
    createMany?: PriceRecordCreateManyMarketInputEnvelope
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
  }

  export type ReceiptUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<ReceiptCreateWithoutMarketInput, ReceiptUncheckedCreateWithoutMarketInput> | ReceiptCreateWithoutMarketInput[] | ReceiptUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutMarketInput | ReceiptCreateOrConnectWithoutMarketInput[]
    createMany?: ReceiptCreateManyMarketInputEnvelope
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
  }

  export type PriceRecordUncheckedCreateNestedManyWithoutMarketInput = {
    create?: XOR<PriceRecordCreateWithoutMarketInput, PriceRecordUncheckedCreateWithoutMarketInput> | PriceRecordCreateWithoutMarketInput[] | PriceRecordUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutMarketInput | PriceRecordCreateOrConnectWithoutMarketInput[]
    createMany?: PriceRecordCreateManyMarketInputEnvelope
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
  }

  export type ReceiptUpdateManyWithoutMarketNestedInput = {
    create?: XOR<ReceiptCreateWithoutMarketInput, ReceiptUncheckedCreateWithoutMarketInput> | ReceiptCreateWithoutMarketInput[] | ReceiptUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutMarketInput | ReceiptCreateOrConnectWithoutMarketInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutMarketInput | ReceiptUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: ReceiptCreateManyMarketInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutMarketInput | ReceiptUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutMarketInput | ReceiptUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type PriceRecordUpdateManyWithoutMarketNestedInput = {
    create?: XOR<PriceRecordCreateWithoutMarketInput, PriceRecordUncheckedCreateWithoutMarketInput> | PriceRecordCreateWithoutMarketInput[] | PriceRecordUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutMarketInput | PriceRecordCreateOrConnectWithoutMarketInput[]
    upsert?: PriceRecordUpsertWithWhereUniqueWithoutMarketInput | PriceRecordUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: PriceRecordCreateManyMarketInputEnvelope
    set?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    disconnect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    delete?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    update?: PriceRecordUpdateWithWhereUniqueWithoutMarketInput | PriceRecordUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: PriceRecordUpdateManyWithWhereWithoutMarketInput | PriceRecordUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
  }

  export type ReceiptUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<ReceiptCreateWithoutMarketInput, ReceiptUncheckedCreateWithoutMarketInput> | ReceiptCreateWithoutMarketInput[] | ReceiptUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: ReceiptCreateOrConnectWithoutMarketInput | ReceiptCreateOrConnectWithoutMarketInput[]
    upsert?: ReceiptUpsertWithWhereUniqueWithoutMarketInput | ReceiptUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: ReceiptCreateManyMarketInputEnvelope
    set?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    disconnect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    delete?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    connect?: ReceiptWhereUniqueInput | ReceiptWhereUniqueInput[]
    update?: ReceiptUpdateWithWhereUniqueWithoutMarketInput | ReceiptUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: ReceiptUpdateManyWithWhereWithoutMarketInput | ReceiptUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
  }

  export type PriceRecordUncheckedUpdateManyWithoutMarketNestedInput = {
    create?: XOR<PriceRecordCreateWithoutMarketInput, PriceRecordUncheckedCreateWithoutMarketInput> | PriceRecordCreateWithoutMarketInput[] | PriceRecordUncheckedCreateWithoutMarketInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutMarketInput | PriceRecordCreateOrConnectWithoutMarketInput[]
    upsert?: PriceRecordUpsertWithWhereUniqueWithoutMarketInput | PriceRecordUpsertWithWhereUniqueWithoutMarketInput[]
    createMany?: PriceRecordCreateManyMarketInputEnvelope
    set?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    disconnect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    delete?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    update?: PriceRecordUpdateWithWhereUniqueWithoutMarketInput | PriceRecordUpdateWithWhereUniqueWithoutMarketInput[]
    updateMany?: PriceRecordUpdateManyWithWhereWithoutMarketInput | PriceRecordUpdateManyWithWhereWithoutMarketInput[]
    deleteMany?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
  }

  export type ReceiptCreateparsingWarningsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceiptsInput
    connect?: UserWhereUniqueInput
  }

  export type MarketCreateNestedOneWithoutReceiptsInput = {
    create?: XOR<MarketCreateWithoutReceiptsInput, MarketUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutReceiptsInput
    connect?: MarketWhereUniqueInput
  }

  export type ReceiptItemCreateNestedManyWithoutReceiptInput = {
    create?: XOR<ReceiptItemCreateWithoutReceiptInput, ReceiptItemUncheckedCreateWithoutReceiptInput> | ReceiptItemCreateWithoutReceiptInput[] | ReceiptItemUncheckedCreateWithoutReceiptInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutReceiptInput | ReceiptItemCreateOrConnectWithoutReceiptInput[]
    createMany?: ReceiptItemCreateManyReceiptInputEnvelope
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
  }

  export type ReceiptItemUncheckedCreateNestedManyWithoutReceiptInput = {
    create?: XOR<ReceiptItemCreateWithoutReceiptInput, ReceiptItemUncheckedCreateWithoutReceiptInput> | ReceiptItemCreateWithoutReceiptInput[] | ReceiptItemUncheckedCreateWithoutReceiptInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutReceiptInput | ReceiptItemCreateOrConnectWithoutReceiptInput[]
    createMany?: ReceiptItemCreateManyReceiptInputEnvelope
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
  }

  export type EnumReceiptSourceFieldUpdateOperationsInput = {
    set?: $Enums.ReceiptSource
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ReceiptUpdateparsingWarningsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceiptsInput
    upsert?: UserUpsertWithoutReceiptsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceiptsInput, UserUpdateWithoutReceiptsInput>, UserUncheckedUpdateWithoutReceiptsInput>
  }

  export type MarketUpdateOneRequiredWithoutReceiptsNestedInput = {
    create?: XOR<MarketCreateWithoutReceiptsInput, MarketUncheckedCreateWithoutReceiptsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutReceiptsInput
    upsert?: MarketUpsertWithoutReceiptsInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutReceiptsInput, MarketUpdateWithoutReceiptsInput>, MarketUncheckedUpdateWithoutReceiptsInput>
  }

  export type ReceiptItemUpdateManyWithoutReceiptNestedInput = {
    create?: XOR<ReceiptItemCreateWithoutReceiptInput, ReceiptItemUncheckedCreateWithoutReceiptInput> | ReceiptItemCreateWithoutReceiptInput[] | ReceiptItemUncheckedCreateWithoutReceiptInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutReceiptInput | ReceiptItemCreateOrConnectWithoutReceiptInput[]
    upsert?: ReceiptItemUpsertWithWhereUniqueWithoutReceiptInput | ReceiptItemUpsertWithWhereUniqueWithoutReceiptInput[]
    createMany?: ReceiptItemCreateManyReceiptInputEnvelope
    set?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    disconnect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    delete?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    update?: ReceiptItemUpdateWithWhereUniqueWithoutReceiptInput | ReceiptItemUpdateWithWhereUniqueWithoutReceiptInput[]
    updateMany?: ReceiptItemUpdateManyWithWhereWithoutReceiptInput | ReceiptItemUpdateManyWithWhereWithoutReceiptInput[]
    deleteMany?: ReceiptItemScalarWhereInput | ReceiptItemScalarWhereInput[]
  }

  export type ReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput = {
    create?: XOR<ReceiptItemCreateWithoutReceiptInput, ReceiptItemUncheckedCreateWithoutReceiptInput> | ReceiptItemCreateWithoutReceiptInput[] | ReceiptItemUncheckedCreateWithoutReceiptInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutReceiptInput | ReceiptItemCreateOrConnectWithoutReceiptInput[]
    upsert?: ReceiptItemUpsertWithWhereUniqueWithoutReceiptInput | ReceiptItemUpsertWithWhereUniqueWithoutReceiptInput[]
    createMany?: ReceiptItemCreateManyReceiptInputEnvelope
    set?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    disconnect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    delete?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    update?: ReceiptItemUpdateWithWhereUniqueWithoutReceiptInput | ReceiptItemUpdateWithWhereUniqueWithoutReceiptInput[]
    updateMany?: ReceiptItemUpdateManyWithWhereWithoutReceiptInput | ReceiptItemUpdateManyWithWhereWithoutReceiptInput[]
    deleteMany?: ReceiptItemScalarWhereInput | ReceiptItemScalarWhereInput[]
  }

  export type ReceiptCreateNestedOneWithoutItemsInput = {
    create?: XOR<ReceiptCreateWithoutItemsInput, ReceiptUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ReceiptCreateOrConnectWithoutItemsInput
    connect?: ReceiptWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutReceiptItemsInput = {
    create?: XOR<ProductCreateWithoutReceiptItemsInput, ProductUncheckedCreateWithoutReceiptItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReceiptItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type PriceRecordCreateNestedManyWithoutReceiptItemInput = {
    create?: XOR<PriceRecordCreateWithoutReceiptItemInput, PriceRecordUncheckedCreateWithoutReceiptItemInput> | PriceRecordCreateWithoutReceiptItemInput[] | PriceRecordUncheckedCreateWithoutReceiptItemInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutReceiptItemInput | PriceRecordCreateOrConnectWithoutReceiptItemInput[]
    createMany?: PriceRecordCreateManyReceiptItemInputEnvelope
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
  }

  export type PriceRecordUncheckedCreateNestedManyWithoutReceiptItemInput = {
    create?: XOR<PriceRecordCreateWithoutReceiptItemInput, PriceRecordUncheckedCreateWithoutReceiptItemInput> | PriceRecordCreateWithoutReceiptItemInput[] | PriceRecordUncheckedCreateWithoutReceiptItemInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutReceiptItemInput | PriceRecordCreateOrConnectWithoutReceiptItemInput[]
    createMany?: PriceRecordCreateManyReceiptItemInputEnvelope
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
  }

  export type ReceiptUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<ReceiptCreateWithoutItemsInput, ReceiptUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ReceiptCreateOrConnectWithoutItemsInput
    upsert?: ReceiptUpsertWithoutItemsInput
    connect?: ReceiptWhereUniqueInput
    update?: XOR<XOR<ReceiptUpdateToOneWithWhereWithoutItemsInput, ReceiptUpdateWithoutItemsInput>, ReceiptUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneWithoutReceiptItemsNestedInput = {
    create?: XOR<ProductCreateWithoutReceiptItemsInput, ProductUncheckedCreateWithoutReceiptItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReceiptItemsInput
    upsert?: ProductUpsertWithoutReceiptItemsInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReceiptItemsInput, ProductUpdateWithoutReceiptItemsInput>, ProductUncheckedUpdateWithoutReceiptItemsInput>
  }

  export type PriceRecordUpdateManyWithoutReceiptItemNestedInput = {
    create?: XOR<PriceRecordCreateWithoutReceiptItemInput, PriceRecordUncheckedCreateWithoutReceiptItemInput> | PriceRecordCreateWithoutReceiptItemInput[] | PriceRecordUncheckedCreateWithoutReceiptItemInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutReceiptItemInput | PriceRecordCreateOrConnectWithoutReceiptItemInput[]
    upsert?: PriceRecordUpsertWithWhereUniqueWithoutReceiptItemInput | PriceRecordUpsertWithWhereUniqueWithoutReceiptItemInput[]
    createMany?: PriceRecordCreateManyReceiptItemInputEnvelope
    set?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    disconnect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    delete?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    update?: PriceRecordUpdateWithWhereUniqueWithoutReceiptItemInput | PriceRecordUpdateWithWhereUniqueWithoutReceiptItemInput[]
    updateMany?: PriceRecordUpdateManyWithWhereWithoutReceiptItemInput | PriceRecordUpdateManyWithWhereWithoutReceiptItemInput[]
    deleteMany?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
  }

  export type PriceRecordUncheckedUpdateManyWithoutReceiptItemNestedInput = {
    create?: XOR<PriceRecordCreateWithoutReceiptItemInput, PriceRecordUncheckedCreateWithoutReceiptItemInput> | PriceRecordCreateWithoutReceiptItemInput[] | PriceRecordUncheckedCreateWithoutReceiptItemInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutReceiptItemInput | PriceRecordCreateOrConnectWithoutReceiptItemInput[]
    upsert?: PriceRecordUpsertWithWhereUniqueWithoutReceiptItemInput | PriceRecordUpsertWithWhereUniqueWithoutReceiptItemInput[]
    createMany?: PriceRecordCreateManyReceiptItemInputEnvelope
    set?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    disconnect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    delete?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    update?: PriceRecordUpdateWithWhereUniqueWithoutReceiptItemInput | PriceRecordUpdateWithWhereUniqueWithoutReceiptItemInput[]
    updateMany?: PriceRecordUpdateManyWithWhereWithoutReceiptItemInput | PriceRecordUpdateManyWithWhereWithoutReceiptItemInput[]
    deleteMany?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
  }

  export type ReceiptItemCreateNestedManyWithoutProductInput = {
    create?: XOR<ReceiptItemCreateWithoutProductInput, ReceiptItemUncheckedCreateWithoutProductInput> | ReceiptItemCreateWithoutProductInput[] | ReceiptItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutProductInput | ReceiptItemCreateOrConnectWithoutProductInput[]
    createMany?: ReceiptItemCreateManyProductInputEnvelope
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
  }

  export type PriceRecordCreateNestedManyWithoutProductInput = {
    create?: XOR<PriceRecordCreateWithoutProductInput, PriceRecordUncheckedCreateWithoutProductInput> | PriceRecordCreateWithoutProductInput[] | PriceRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutProductInput | PriceRecordCreateOrConnectWithoutProductInput[]
    createMany?: PriceRecordCreateManyProductInputEnvelope
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
  }

  export type ShoppingListItemCreateNestedManyWithoutProductInput = {
    create?: XOR<ShoppingListItemCreateWithoutProductInput, ShoppingListItemUncheckedCreateWithoutProductInput> | ShoppingListItemCreateWithoutProductInput[] | ShoppingListItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutProductInput | ShoppingListItemCreateOrConnectWithoutProductInput[]
    createMany?: ShoppingListItemCreateManyProductInputEnvelope
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
  }

  export type ReceiptItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ReceiptItemCreateWithoutProductInput, ReceiptItemUncheckedCreateWithoutProductInput> | ReceiptItemCreateWithoutProductInput[] | ReceiptItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutProductInput | ReceiptItemCreateOrConnectWithoutProductInput[]
    createMany?: ReceiptItemCreateManyProductInputEnvelope
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
  }

  export type PriceRecordUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<PriceRecordCreateWithoutProductInput, PriceRecordUncheckedCreateWithoutProductInput> | PriceRecordCreateWithoutProductInput[] | PriceRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutProductInput | PriceRecordCreateOrConnectWithoutProductInput[]
    createMany?: PriceRecordCreateManyProductInputEnvelope
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
  }

  export type ShoppingListItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ShoppingListItemCreateWithoutProductInput, ShoppingListItemUncheckedCreateWithoutProductInput> | ShoppingListItemCreateWithoutProductInput[] | ShoppingListItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutProductInput | ShoppingListItemCreateOrConnectWithoutProductInput[]
    createMany?: ShoppingListItemCreateManyProductInputEnvelope
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ReceiptItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReceiptItemCreateWithoutProductInput, ReceiptItemUncheckedCreateWithoutProductInput> | ReceiptItemCreateWithoutProductInput[] | ReceiptItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutProductInput | ReceiptItemCreateOrConnectWithoutProductInput[]
    upsert?: ReceiptItemUpsertWithWhereUniqueWithoutProductInput | ReceiptItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReceiptItemCreateManyProductInputEnvelope
    set?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    disconnect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    delete?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    update?: ReceiptItemUpdateWithWhereUniqueWithoutProductInput | ReceiptItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReceiptItemUpdateManyWithWhereWithoutProductInput | ReceiptItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReceiptItemScalarWhereInput | ReceiptItemScalarWhereInput[]
  }

  export type PriceRecordUpdateManyWithoutProductNestedInput = {
    create?: XOR<PriceRecordCreateWithoutProductInput, PriceRecordUncheckedCreateWithoutProductInput> | PriceRecordCreateWithoutProductInput[] | PriceRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutProductInput | PriceRecordCreateOrConnectWithoutProductInput[]
    upsert?: PriceRecordUpsertWithWhereUniqueWithoutProductInput | PriceRecordUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: PriceRecordCreateManyProductInputEnvelope
    set?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    disconnect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    delete?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    update?: PriceRecordUpdateWithWhereUniqueWithoutProductInput | PriceRecordUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: PriceRecordUpdateManyWithWhereWithoutProductInput | PriceRecordUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
  }

  export type ShoppingListItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<ShoppingListItemCreateWithoutProductInput, ShoppingListItemUncheckedCreateWithoutProductInput> | ShoppingListItemCreateWithoutProductInput[] | ShoppingListItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutProductInput | ShoppingListItemCreateOrConnectWithoutProductInput[]
    upsert?: ShoppingListItemUpsertWithWhereUniqueWithoutProductInput | ShoppingListItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ShoppingListItemCreateManyProductInputEnvelope
    set?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    disconnect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    delete?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    update?: ShoppingListItemUpdateWithWhereUniqueWithoutProductInput | ShoppingListItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ShoppingListItemUpdateManyWithWhereWithoutProductInput | ShoppingListItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ShoppingListItemScalarWhereInput | ShoppingListItemScalarWhereInput[]
  }

  export type ReceiptItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReceiptItemCreateWithoutProductInput, ReceiptItemUncheckedCreateWithoutProductInput> | ReceiptItemCreateWithoutProductInput[] | ReceiptItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutProductInput | ReceiptItemCreateOrConnectWithoutProductInput[]
    upsert?: ReceiptItemUpsertWithWhereUniqueWithoutProductInput | ReceiptItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReceiptItemCreateManyProductInputEnvelope
    set?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    disconnect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    delete?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    connect?: ReceiptItemWhereUniqueInput | ReceiptItemWhereUniqueInput[]
    update?: ReceiptItemUpdateWithWhereUniqueWithoutProductInput | ReceiptItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReceiptItemUpdateManyWithWhereWithoutProductInput | ReceiptItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReceiptItemScalarWhereInput | ReceiptItemScalarWhereInput[]
  }

  export type PriceRecordUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<PriceRecordCreateWithoutProductInput, PriceRecordUncheckedCreateWithoutProductInput> | PriceRecordCreateWithoutProductInput[] | PriceRecordUncheckedCreateWithoutProductInput[]
    connectOrCreate?: PriceRecordCreateOrConnectWithoutProductInput | PriceRecordCreateOrConnectWithoutProductInput[]
    upsert?: PriceRecordUpsertWithWhereUniqueWithoutProductInput | PriceRecordUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: PriceRecordCreateManyProductInputEnvelope
    set?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    disconnect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    delete?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    connect?: PriceRecordWhereUniqueInput | PriceRecordWhereUniqueInput[]
    update?: PriceRecordUpdateWithWhereUniqueWithoutProductInput | PriceRecordUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: PriceRecordUpdateManyWithWhereWithoutProductInput | PriceRecordUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
  }

  export type ShoppingListItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ShoppingListItemCreateWithoutProductInput, ShoppingListItemUncheckedCreateWithoutProductInput> | ShoppingListItemCreateWithoutProductInput[] | ShoppingListItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutProductInput | ShoppingListItemCreateOrConnectWithoutProductInput[]
    upsert?: ShoppingListItemUpsertWithWhereUniqueWithoutProductInput | ShoppingListItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ShoppingListItemCreateManyProductInputEnvelope
    set?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    disconnect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    delete?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    update?: ShoppingListItemUpdateWithWhereUniqueWithoutProductInput | ShoppingListItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ShoppingListItemUpdateManyWithWhereWithoutProductInput | ShoppingListItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ShoppingListItemScalarWhereInput | ShoppingListItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutPriceRecordsInput = {
    create?: XOR<ProductCreateWithoutPriceRecordsInput, ProductUncheckedCreateWithoutPriceRecordsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPriceRecordsInput
    connect?: ProductWhereUniqueInput
  }

  export type MarketCreateNestedOneWithoutPriceRecordsInput = {
    create?: XOR<MarketCreateWithoutPriceRecordsInput, MarketUncheckedCreateWithoutPriceRecordsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutPriceRecordsInput
    connect?: MarketWhereUniqueInput
  }

  export type ReceiptItemCreateNestedOneWithoutPriceRecordsInput = {
    create?: XOR<ReceiptItemCreateWithoutPriceRecordsInput, ReceiptItemUncheckedCreateWithoutPriceRecordsInput>
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutPriceRecordsInput
    connect?: ReceiptItemWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutPriceRecordsNestedInput = {
    create?: XOR<ProductCreateWithoutPriceRecordsInput, ProductUncheckedCreateWithoutPriceRecordsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPriceRecordsInput
    upsert?: ProductUpsertWithoutPriceRecordsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutPriceRecordsInput, ProductUpdateWithoutPriceRecordsInput>, ProductUncheckedUpdateWithoutPriceRecordsInput>
  }

  export type MarketUpdateOneRequiredWithoutPriceRecordsNestedInput = {
    create?: XOR<MarketCreateWithoutPriceRecordsInput, MarketUncheckedCreateWithoutPriceRecordsInput>
    connectOrCreate?: MarketCreateOrConnectWithoutPriceRecordsInput
    upsert?: MarketUpsertWithoutPriceRecordsInput
    connect?: MarketWhereUniqueInput
    update?: XOR<XOR<MarketUpdateToOneWithWhereWithoutPriceRecordsInput, MarketUpdateWithoutPriceRecordsInput>, MarketUncheckedUpdateWithoutPriceRecordsInput>
  }

  export type ReceiptItemUpdateOneWithoutPriceRecordsNestedInput = {
    create?: XOR<ReceiptItemCreateWithoutPriceRecordsInput, ReceiptItemUncheckedCreateWithoutPriceRecordsInput>
    connectOrCreate?: ReceiptItemCreateOrConnectWithoutPriceRecordsInput
    upsert?: ReceiptItemUpsertWithoutPriceRecordsInput
    disconnect?: ReceiptItemWhereInput | boolean
    delete?: ReceiptItemWhereInput | boolean
    connect?: ReceiptItemWhereUniqueInput
    update?: XOR<XOR<ReceiptItemUpdateToOneWithWhereWithoutPriceRecordsInput, ReceiptItemUpdateWithoutPriceRecordsInput>, ReceiptItemUncheckedUpdateWithoutPriceRecordsInput>
  }

  export type UserCreateNestedOneWithoutShoppingListsInput = {
    create?: XOR<UserCreateWithoutShoppingListsInput, UserUncheckedCreateWithoutShoppingListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutShoppingListsInput
    connect?: UserWhereUniqueInput
  }

  export type ShoppingListItemCreateNestedManyWithoutShoppingListInput = {
    create?: XOR<ShoppingListItemCreateWithoutShoppingListInput, ShoppingListItemUncheckedCreateWithoutShoppingListInput> | ShoppingListItemCreateWithoutShoppingListInput[] | ShoppingListItemUncheckedCreateWithoutShoppingListInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutShoppingListInput | ShoppingListItemCreateOrConnectWithoutShoppingListInput[]
    createMany?: ShoppingListItemCreateManyShoppingListInputEnvelope
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
  }

  export type ShoppingListItemUncheckedCreateNestedManyWithoutShoppingListInput = {
    create?: XOR<ShoppingListItemCreateWithoutShoppingListInput, ShoppingListItemUncheckedCreateWithoutShoppingListInput> | ShoppingListItemCreateWithoutShoppingListInput[] | ShoppingListItemUncheckedCreateWithoutShoppingListInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutShoppingListInput | ShoppingListItemCreateOrConnectWithoutShoppingListInput[]
    createMany?: ShoppingListItemCreateManyShoppingListInputEnvelope
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutShoppingListsNestedInput = {
    create?: XOR<UserCreateWithoutShoppingListsInput, UserUncheckedCreateWithoutShoppingListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutShoppingListsInput
    upsert?: UserUpsertWithoutShoppingListsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutShoppingListsInput, UserUpdateWithoutShoppingListsInput>, UserUncheckedUpdateWithoutShoppingListsInput>
  }

  export type ShoppingListItemUpdateManyWithoutShoppingListNestedInput = {
    create?: XOR<ShoppingListItemCreateWithoutShoppingListInput, ShoppingListItemUncheckedCreateWithoutShoppingListInput> | ShoppingListItemCreateWithoutShoppingListInput[] | ShoppingListItemUncheckedCreateWithoutShoppingListInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutShoppingListInput | ShoppingListItemCreateOrConnectWithoutShoppingListInput[]
    upsert?: ShoppingListItemUpsertWithWhereUniqueWithoutShoppingListInput | ShoppingListItemUpsertWithWhereUniqueWithoutShoppingListInput[]
    createMany?: ShoppingListItemCreateManyShoppingListInputEnvelope
    set?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    disconnect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    delete?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    update?: ShoppingListItemUpdateWithWhereUniqueWithoutShoppingListInput | ShoppingListItemUpdateWithWhereUniqueWithoutShoppingListInput[]
    updateMany?: ShoppingListItemUpdateManyWithWhereWithoutShoppingListInput | ShoppingListItemUpdateManyWithWhereWithoutShoppingListInput[]
    deleteMany?: ShoppingListItemScalarWhereInput | ShoppingListItemScalarWhereInput[]
  }

  export type ShoppingListItemUncheckedUpdateManyWithoutShoppingListNestedInput = {
    create?: XOR<ShoppingListItemCreateWithoutShoppingListInput, ShoppingListItemUncheckedCreateWithoutShoppingListInput> | ShoppingListItemCreateWithoutShoppingListInput[] | ShoppingListItemUncheckedCreateWithoutShoppingListInput[]
    connectOrCreate?: ShoppingListItemCreateOrConnectWithoutShoppingListInput | ShoppingListItemCreateOrConnectWithoutShoppingListInput[]
    upsert?: ShoppingListItemUpsertWithWhereUniqueWithoutShoppingListInput | ShoppingListItemUpsertWithWhereUniqueWithoutShoppingListInput[]
    createMany?: ShoppingListItemCreateManyShoppingListInputEnvelope
    set?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    disconnect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    delete?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    connect?: ShoppingListItemWhereUniqueInput | ShoppingListItemWhereUniqueInput[]
    update?: ShoppingListItemUpdateWithWhereUniqueWithoutShoppingListInput | ShoppingListItemUpdateWithWhereUniqueWithoutShoppingListInput[]
    updateMany?: ShoppingListItemUpdateManyWithWhereWithoutShoppingListInput | ShoppingListItemUpdateManyWithWhereWithoutShoppingListInput[]
    deleteMany?: ShoppingListItemScalarWhereInput | ShoppingListItemScalarWhereInput[]
  }

  export type ShoppingListCreateNestedOneWithoutItemsInput = {
    create?: XOR<ShoppingListCreateWithoutItemsInput, ShoppingListUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ShoppingListCreateOrConnectWithoutItemsInput
    connect?: ShoppingListWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutShoppingListItemsInput = {
    create?: XOR<ProductCreateWithoutShoppingListItemsInput, ProductUncheckedCreateWithoutShoppingListItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutShoppingListItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type ShoppingListUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<ShoppingListCreateWithoutItemsInput, ShoppingListUncheckedCreateWithoutItemsInput>
    connectOrCreate?: ShoppingListCreateOrConnectWithoutItemsInput
    upsert?: ShoppingListUpsertWithoutItemsInput
    connect?: ShoppingListWhereUniqueInput
    update?: XOR<XOR<ShoppingListUpdateToOneWithWhereWithoutItemsInput, ShoppingListUpdateWithoutItemsInput>, ShoppingListUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneWithoutShoppingListItemsNestedInput = {
    create?: XOR<ProductCreateWithoutShoppingListItemsInput, ProductUncheckedCreateWithoutShoppingListItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutShoppingListItemsInput
    upsert?: ProductUpsertWithoutShoppingListItemsInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutShoppingListItemsInput, ProductUpdateWithoutShoppingListItemsInput>, ProductUncheckedUpdateWithoutShoppingListItemsInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetTokenInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokenInput
    upsert?: UserUpsertWithoutPasswordResetTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokenInput, UserUpdateWithoutPasswordResetTokenInput>, UserUncheckedUpdateWithoutPasswordResetTokenInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumReceiptSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptSource | EnumReceiptSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptSourceFilter<$PrismaModel> | $Enums.ReceiptSource
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumReceiptSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReceiptSource | EnumReceiptSourceFieldRefInput<$PrismaModel>
    in?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReceiptSource[] | ListEnumReceiptSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumReceiptSourceWithAggregatesFilter<$PrismaModel> | $Enums.ReceiptSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReceiptSourceFilter<$PrismaModel>
    _max?: NestedEnumReceiptSourceFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ReceiptCreateWithoutUserInput = {
    id?: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    market: MarketCreateNestedOneWithoutReceiptsInput
    items?: ReceiptItemCreateNestedManyWithoutReceiptInput
  }

  export type ReceiptUncheckedCreateWithoutUserInput = {
    id?: string
    marketId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReceiptItemUncheckedCreateNestedManyWithoutReceiptInput
  }

  export type ReceiptCreateOrConnectWithoutUserInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutUserInput, ReceiptUncheckedCreateWithoutUserInput>
  }

  export type ReceiptCreateManyUserInputEnvelope = {
    data: ReceiptCreateManyUserInput | ReceiptCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ShoppingListCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ShoppingListItemCreateNestedManyWithoutShoppingListInput
  }

  export type ShoppingListUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ShoppingListItemUncheckedCreateNestedManyWithoutShoppingListInput
  }

  export type ShoppingListCreateOrConnectWithoutUserInput = {
    where: ShoppingListWhereUniqueInput
    create: XOR<ShoppingListCreateWithoutUserInput, ShoppingListUncheckedCreateWithoutUserInput>
  }

  export type ShoppingListCreateManyUserInputEnvelope = {
    data: ShoppingListCreateManyUserInput | ShoppingListCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type ReceiptUpsertWithWhereUniqueWithoutUserInput = {
    where: ReceiptWhereUniqueInput
    update: XOR<ReceiptUpdateWithoutUserInput, ReceiptUncheckedUpdateWithoutUserInput>
    create: XOR<ReceiptCreateWithoutUserInput, ReceiptUncheckedCreateWithoutUserInput>
  }

  export type ReceiptUpdateWithWhereUniqueWithoutUserInput = {
    where: ReceiptWhereUniqueInput
    data: XOR<ReceiptUpdateWithoutUserInput, ReceiptUncheckedUpdateWithoutUserInput>
  }

  export type ReceiptUpdateManyWithWhereWithoutUserInput = {
    where: ReceiptScalarWhereInput
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyWithoutUserInput>
  }

  export type ReceiptScalarWhereInput = {
    AND?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
    OR?: ReceiptScalarWhereInput[]
    NOT?: ReceiptScalarWhereInput | ReceiptScalarWhereInput[]
    id?: StringFilter<"Receipt"> | string
    userId?: StringFilter<"Receipt"> | string
    marketId?: StringFilter<"Receipt"> | string
    externalCode?: StringNullableFilter<"Receipt"> | string | null
    sourceType?: EnumReceiptSourceFilter<"Receipt"> | $Enums.ReceiptSource
    totalAmount?: FloatFilter<"Receipt"> | number
    purchasedAt?: DateTimeFilter<"Receipt"> | Date | string
    parsingScore?: FloatNullableFilter<"Receipt"> | number | null
    parsingWarnings?: StringNullableListFilter<"Receipt">
    createdAt?: DateTimeFilter<"Receipt"> | Date | string
    updatedAt?: DateTimeFilter<"Receipt"> | Date | string
  }

  export type ShoppingListUpsertWithWhereUniqueWithoutUserInput = {
    where: ShoppingListWhereUniqueInput
    update: XOR<ShoppingListUpdateWithoutUserInput, ShoppingListUncheckedUpdateWithoutUserInput>
    create: XOR<ShoppingListCreateWithoutUserInput, ShoppingListUncheckedCreateWithoutUserInput>
  }

  export type ShoppingListUpdateWithWhereUniqueWithoutUserInput = {
    where: ShoppingListWhereUniqueInput
    data: XOR<ShoppingListUpdateWithoutUserInput, ShoppingListUncheckedUpdateWithoutUserInput>
  }

  export type ShoppingListUpdateManyWithWhereWithoutUserInput = {
    where: ShoppingListScalarWhereInput
    data: XOR<ShoppingListUpdateManyMutationInput, ShoppingListUncheckedUpdateManyWithoutUserInput>
  }

  export type ShoppingListScalarWhereInput = {
    AND?: ShoppingListScalarWhereInput | ShoppingListScalarWhereInput[]
    OR?: ShoppingListScalarWhereInput[]
    NOT?: ShoppingListScalarWhereInput | ShoppingListScalarWhereInput[]
    id?: StringFilter<"ShoppingList"> | string
    userId?: StringFilter<"ShoppingList"> | string
    name?: StringFilter<"ShoppingList"> | string
    createdAt?: DateTimeFilter<"ShoppingList"> | Date | string
    updatedAt?: DateTimeFilter<"ShoppingList"> | Date | string
  }

  export type PasswordResetTokenUpsertWithoutUserInput = {
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
    where?: PasswordResetTokenWhereInput
  }

  export type PasswordResetTokenUpdateToOneWithWhereWithoutUserInput = {
    where?: PasswordResetTokenWhereInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateWithoutMarketInput = {
    id?: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReceiptsInput
    items?: ReceiptItemCreateNestedManyWithoutReceiptInput
  }

  export type ReceiptUncheckedCreateWithoutMarketInput = {
    id?: string
    userId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ReceiptItemUncheckedCreateNestedManyWithoutReceiptInput
  }

  export type ReceiptCreateOrConnectWithoutMarketInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutMarketInput, ReceiptUncheckedCreateWithoutMarketInput>
  }

  export type ReceiptCreateManyMarketInputEnvelope = {
    data: ReceiptCreateManyMarketInput | ReceiptCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type PriceRecordCreateWithoutMarketInput = {
    id?: string
    price: number
    observedAt: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutPriceRecordsInput
    receiptItem?: ReceiptItemCreateNestedOneWithoutPriceRecordsInput
  }

  export type PriceRecordUncheckedCreateWithoutMarketInput = {
    id?: string
    productId: string
    receiptItemId?: string | null
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type PriceRecordCreateOrConnectWithoutMarketInput = {
    where: PriceRecordWhereUniqueInput
    create: XOR<PriceRecordCreateWithoutMarketInput, PriceRecordUncheckedCreateWithoutMarketInput>
  }

  export type PriceRecordCreateManyMarketInputEnvelope = {
    data: PriceRecordCreateManyMarketInput | PriceRecordCreateManyMarketInput[]
    skipDuplicates?: boolean
  }

  export type ReceiptUpsertWithWhereUniqueWithoutMarketInput = {
    where: ReceiptWhereUniqueInput
    update: XOR<ReceiptUpdateWithoutMarketInput, ReceiptUncheckedUpdateWithoutMarketInput>
    create: XOR<ReceiptCreateWithoutMarketInput, ReceiptUncheckedCreateWithoutMarketInput>
  }

  export type ReceiptUpdateWithWhereUniqueWithoutMarketInput = {
    where: ReceiptWhereUniqueInput
    data: XOR<ReceiptUpdateWithoutMarketInput, ReceiptUncheckedUpdateWithoutMarketInput>
  }

  export type ReceiptUpdateManyWithWhereWithoutMarketInput = {
    where: ReceiptScalarWhereInput
    data: XOR<ReceiptUpdateManyMutationInput, ReceiptUncheckedUpdateManyWithoutMarketInput>
  }

  export type PriceRecordUpsertWithWhereUniqueWithoutMarketInput = {
    where: PriceRecordWhereUniqueInput
    update: XOR<PriceRecordUpdateWithoutMarketInput, PriceRecordUncheckedUpdateWithoutMarketInput>
    create: XOR<PriceRecordCreateWithoutMarketInput, PriceRecordUncheckedCreateWithoutMarketInput>
  }

  export type PriceRecordUpdateWithWhereUniqueWithoutMarketInput = {
    where: PriceRecordWhereUniqueInput
    data: XOR<PriceRecordUpdateWithoutMarketInput, PriceRecordUncheckedUpdateWithoutMarketInput>
  }

  export type PriceRecordUpdateManyWithWhereWithoutMarketInput = {
    where: PriceRecordScalarWhereInput
    data: XOR<PriceRecordUpdateManyMutationInput, PriceRecordUncheckedUpdateManyWithoutMarketInput>
  }

  export type PriceRecordScalarWhereInput = {
    AND?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
    OR?: PriceRecordScalarWhereInput[]
    NOT?: PriceRecordScalarWhereInput | PriceRecordScalarWhereInput[]
    id?: StringFilter<"PriceRecord"> | string
    productId?: StringFilter<"PriceRecord"> | string
    marketId?: StringFilter<"PriceRecord"> | string
    receiptItemId?: StringNullableFilter<"PriceRecord"> | string | null
    price?: FloatFilter<"PriceRecord"> | number
    observedAt?: DateTimeFilter<"PriceRecord"> | Date | string
    createdAt?: DateTimeFilter<"PriceRecord"> | Date | string
  }

  export type UserCreateWithoutReceiptsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shoppingLists?: ShoppingListCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceiptsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shoppingLists?: ShoppingListUncheckedCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceiptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
  }

  export type MarketCreateWithoutReceiptsInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceRecords?: PriceRecordCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutReceiptsInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutReceiptsInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutReceiptsInput, MarketUncheckedCreateWithoutReceiptsInput>
  }

  export type ReceiptItemCreateWithoutReceiptInput = {
    id?: string
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    product?: ProductCreateNestedOneWithoutReceiptItemsInput
    priceRecords?: PriceRecordCreateNestedManyWithoutReceiptItemInput
  }

  export type ReceiptItemUncheckedCreateWithoutReceiptInput = {
    id?: string
    productId?: string | null
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutReceiptItemInput
  }

  export type ReceiptItemCreateOrConnectWithoutReceiptInput = {
    where: ReceiptItemWhereUniqueInput
    create: XOR<ReceiptItemCreateWithoutReceiptInput, ReceiptItemUncheckedCreateWithoutReceiptInput>
  }

  export type ReceiptItemCreateManyReceiptInputEnvelope = {
    data: ReceiptItemCreateManyReceiptInput | ReceiptItemCreateManyReceiptInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReceiptsInput = {
    update: XOR<UserUpdateWithoutReceiptsInput, UserUncheckedUpdateWithoutReceiptsInput>
    create: XOR<UserCreateWithoutReceiptsInput, UserUncheckedCreateWithoutReceiptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceiptsInput, UserUncheckedUpdateWithoutReceiptsInput>
  }

  export type UserUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shoppingLists?: ShoppingListUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shoppingLists?: ShoppingListUncheckedUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type MarketUpsertWithoutReceiptsInput = {
    update: XOR<MarketUpdateWithoutReceiptsInput, MarketUncheckedUpdateWithoutReceiptsInput>
    create: XOR<MarketCreateWithoutReceiptsInput, MarketUncheckedCreateWithoutReceiptsInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutReceiptsInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutReceiptsInput, MarketUncheckedUpdateWithoutReceiptsInput>
  }

  export type MarketUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutReceiptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type ReceiptItemUpsertWithWhereUniqueWithoutReceiptInput = {
    where: ReceiptItemWhereUniqueInput
    update: XOR<ReceiptItemUpdateWithoutReceiptInput, ReceiptItemUncheckedUpdateWithoutReceiptInput>
    create: XOR<ReceiptItemCreateWithoutReceiptInput, ReceiptItemUncheckedCreateWithoutReceiptInput>
  }

  export type ReceiptItemUpdateWithWhereUniqueWithoutReceiptInput = {
    where: ReceiptItemWhereUniqueInput
    data: XOR<ReceiptItemUpdateWithoutReceiptInput, ReceiptItemUncheckedUpdateWithoutReceiptInput>
  }

  export type ReceiptItemUpdateManyWithWhereWithoutReceiptInput = {
    where: ReceiptItemScalarWhereInput
    data: XOR<ReceiptItemUpdateManyMutationInput, ReceiptItemUncheckedUpdateManyWithoutReceiptInput>
  }

  export type ReceiptItemScalarWhereInput = {
    AND?: ReceiptItemScalarWhereInput | ReceiptItemScalarWhereInput[]
    OR?: ReceiptItemScalarWhereInput[]
    NOT?: ReceiptItemScalarWhereInput | ReceiptItemScalarWhereInput[]
    id?: StringFilter<"ReceiptItem"> | string
    receiptId?: StringFilter<"ReceiptItem"> | string
    productId?: StringNullableFilter<"ReceiptItem"> | string | null
    nameRaw?: StringFilter<"ReceiptItem"> | string
    unit?: StringNullableFilter<"ReceiptItem"> | string | null
    quantity?: FloatNullableFilter<"ReceiptItem"> | number | null
    unitPrice?: FloatFilter<"ReceiptItem"> | number
    totalPrice?: FloatNullableFilter<"ReceiptItem"> | number | null
    createdAt?: DateTimeFilter<"ReceiptItem"> | Date | string
  }

  export type ReceiptCreateWithoutItemsInput = {
    id?: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReceiptsInput
    market: MarketCreateNestedOneWithoutReceiptsInput
  }

  export type ReceiptUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    marketId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptCreateOrConnectWithoutItemsInput = {
    where: ReceiptWhereUniqueInput
    create: XOR<ReceiptCreateWithoutItemsInput, ReceiptUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutReceiptItemsInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    priceRecords?: PriceRecordCreateNestedManyWithoutProductInput
    shoppingListItems?: ShoppingListItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutReceiptItemsInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutProductInput
    shoppingListItems?: ShoppingListItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutReceiptItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReceiptItemsInput, ProductUncheckedCreateWithoutReceiptItemsInput>
  }

  export type PriceRecordCreateWithoutReceiptItemInput = {
    id?: string
    price: number
    observedAt: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutPriceRecordsInput
    market: MarketCreateNestedOneWithoutPriceRecordsInput
  }

  export type PriceRecordUncheckedCreateWithoutReceiptItemInput = {
    id?: string
    productId: string
    marketId: string
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type PriceRecordCreateOrConnectWithoutReceiptItemInput = {
    where: PriceRecordWhereUniqueInput
    create: XOR<PriceRecordCreateWithoutReceiptItemInput, PriceRecordUncheckedCreateWithoutReceiptItemInput>
  }

  export type PriceRecordCreateManyReceiptItemInputEnvelope = {
    data: PriceRecordCreateManyReceiptItemInput | PriceRecordCreateManyReceiptItemInput[]
    skipDuplicates?: boolean
  }

  export type ReceiptUpsertWithoutItemsInput = {
    update: XOR<ReceiptUpdateWithoutItemsInput, ReceiptUncheckedUpdateWithoutItemsInput>
    create: XOR<ReceiptCreateWithoutItemsInput, ReceiptUncheckedCreateWithoutItemsInput>
    where?: ReceiptWhereInput
  }

  export type ReceiptUpdateToOneWithWhereWithoutItemsInput = {
    where?: ReceiptWhereInput
    data: XOR<ReceiptUpdateWithoutItemsInput, ReceiptUncheckedUpdateWithoutItemsInput>
  }

  export type ReceiptUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReceiptsNestedInput
    market?: MarketUpdateOneRequiredWithoutReceiptsNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutReceiptItemsInput = {
    update: XOR<ProductUpdateWithoutReceiptItemsInput, ProductUncheckedUpdateWithoutReceiptItemsInput>
    create: XOR<ProductCreateWithoutReceiptItemsInput, ProductUncheckedCreateWithoutReceiptItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReceiptItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReceiptItemsInput, ProductUncheckedUpdateWithoutReceiptItemsInput>
  }

  export type ProductUpdateWithoutReceiptItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUpdateManyWithoutProductNestedInput
    shoppingListItems?: ShoppingListItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutReceiptItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutProductNestedInput
    shoppingListItems?: ShoppingListItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type PriceRecordUpsertWithWhereUniqueWithoutReceiptItemInput = {
    where: PriceRecordWhereUniqueInput
    update: XOR<PriceRecordUpdateWithoutReceiptItemInput, PriceRecordUncheckedUpdateWithoutReceiptItemInput>
    create: XOR<PriceRecordCreateWithoutReceiptItemInput, PriceRecordUncheckedCreateWithoutReceiptItemInput>
  }

  export type PriceRecordUpdateWithWhereUniqueWithoutReceiptItemInput = {
    where: PriceRecordWhereUniqueInput
    data: XOR<PriceRecordUpdateWithoutReceiptItemInput, PriceRecordUncheckedUpdateWithoutReceiptItemInput>
  }

  export type PriceRecordUpdateManyWithWhereWithoutReceiptItemInput = {
    where: PriceRecordScalarWhereInput
    data: XOR<PriceRecordUpdateManyMutationInput, PriceRecordUncheckedUpdateManyWithoutReceiptItemInput>
  }

  export type ReceiptItemCreateWithoutProductInput = {
    id?: string
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    receipt: ReceiptCreateNestedOneWithoutItemsInput
    priceRecords?: PriceRecordCreateNestedManyWithoutReceiptItemInput
  }

  export type ReceiptItemUncheckedCreateWithoutProductInput = {
    id?: string
    receiptId: string
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutReceiptItemInput
  }

  export type ReceiptItemCreateOrConnectWithoutProductInput = {
    where: ReceiptItemWhereUniqueInput
    create: XOR<ReceiptItemCreateWithoutProductInput, ReceiptItemUncheckedCreateWithoutProductInput>
  }

  export type ReceiptItemCreateManyProductInputEnvelope = {
    data: ReceiptItemCreateManyProductInput | ReceiptItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type PriceRecordCreateWithoutProductInput = {
    id?: string
    price: number
    observedAt: Date | string
    createdAt?: Date | string
    market: MarketCreateNestedOneWithoutPriceRecordsInput
    receiptItem?: ReceiptItemCreateNestedOneWithoutPriceRecordsInput
  }

  export type PriceRecordUncheckedCreateWithoutProductInput = {
    id?: string
    marketId: string
    receiptItemId?: string | null
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type PriceRecordCreateOrConnectWithoutProductInput = {
    where: PriceRecordWhereUniqueInput
    create: XOR<PriceRecordCreateWithoutProductInput, PriceRecordUncheckedCreateWithoutProductInput>
  }

  export type PriceRecordCreateManyProductInputEnvelope = {
    data: PriceRecordCreateManyProductInput | PriceRecordCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ShoppingListItemCreateWithoutProductInput = {
    id?: string
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shoppingList: ShoppingListCreateNestedOneWithoutItemsInput
  }

  export type ShoppingListItemUncheckedCreateWithoutProductInput = {
    id?: string
    shoppingListId: string
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListItemCreateOrConnectWithoutProductInput = {
    where: ShoppingListItemWhereUniqueInput
    create: XOR<ShoppingListItemCreateWithoutProductInput, ShoppingListItemUncheckedCreateWithoutProductInput>
  }

  export type ShoppingListItemCreateManyProductInputEnvelope = {
    data: ShoppingListItemCreateManyProductInput | ShoppingListItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ReceiptItemUpsertWithWhereUniqueWithoutProductInput = {
    where: ReceiptItemWhereUniqueInput
    update: XOR<ReceiptItemUpdateWithoutProductInput, ReceiptItemUncheckedUpdateWithoutProductInput>
    create: XOR<ReceiptItemCreateWithoutProductInput, ReceiptItemUncheckedCreateWithoutProductInput>
  }

  export type ReceiptItemUpdateWithWhereUniqueWithoutProductInput = {
    where: ReceiptItemWhereUniqueInput
    data: XOR<ReceiptItemUpdateWithoutProductInput, ReceiptItemUncheckedUpdateWithoutProductInput>
  }

  export type ReceiptItemUpdateManyWithWhereWithoutProductInput = {
    where: ReceiptItemScalarWhereInput
    data: XOR<ReceiptItemUpdateManyMutationInput, ReceiptItemUncheckedUpdateManyWithoutProductInput>
  }

  export type PriceRecordUpsertWithWhereUniqueWithoutProductInput = {
    where: PriceRecordWhereUniqueInput
    update: XOR<PriceRecordUpdateWithoutProductInput, PriceRecordUncheckedUpdateWithoutProductInput>
    create: XOR<PriceRecordCreateWithoutProductInput, PriceRecordUncheckedCreateWithoutProductInput>
  }

  export type PriceRecordUpdateWithWhereUniqueWithoutProductInput = {
    where: PriceRecordWhereUniqueInput
    data: XOR<PriceRecordUpdateWithoutProductInput, PriceRecordUncheckedUpdateWithoutProductInput>
  }

  export type PriceRecordUpdateManyWithWhereWithoutProductInput = {
    where: PriceRecordScalarWhereInput
    data: XOR<PriceRecordUpdateManyMutationInput, PriceRecordUncheckedUpdateManyWithoutProductInput>
  }

  export type ShoppingListItemUpsertWithWhereUniqueWithoutProductInput = {
    where: ShoppingListItemWhereUniqueInput
    update: XOR<ShoppingListItemUpdateWithoutProductInput, ShoppingListItemUncheckedUpdateWithoutProductInput>
    create: XOR<ShoppingListItemCreateWithoutProductInput, ShoppingListItemUncheckedCreateWithoutProductInput>
  }

  export type ShoppingListItemUpdateWithWhereUniqueWithoutProductInput = {
    where: ShoppingListItemWhereUniqueInput
    data: XOR<ShoppingListItemUpdateWithoutProductInput, ShoppingListItemUncheckedUpdateWithoutProductInput>
  }

  export type ShoppingListItemUpdateManyWithWhereWithoutProductInput = {
    where: ShoppingListItemScalarWhereInput
    data: XOR<ShoppingListItemUpdateManyMutationInput, ShoppingListItemUncheckedUpdateManyWithoutProductInput>
  }

  export type ShoppingListItemScalarWhereInput = {
    AND?: ShoppingListItemScalarWhereInput | ShoppingListItemScalarWhereInput[]
    OR?: ShoppingListItemScalarWhereInput[]
    NOT?: ShoppingListItemScalarWhereInput | ShoppingListItemScalarWhereInput[]
    id?: StringFilter<"ShoppingListItem"> | string
    shoppingListId?: StringFilter<"ShoppingListItem"> | string
    productId?: StringNullableFilter<"ShoppingListItem"> | string | null
    name?: StringFilter<"ShoppingListItem"> | string
    quantity?: FloatNullableFilter<"ShoppingListItem"> | number | null
    unit?: StringNullableFilter<"ShoppingListItem"> | string | null
    createdAt?: DateTimeFilter<"ShoppingListItem"> | Date | string
    updatedAt?: DateTimeFilter<"ShoppingListItem"> | Date | string
  }

  export type ProductCreateWithoutPriceRecordsInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiptItems?: ReceiptItemCreateNestedManyWithoutProductInput
    shoppingListItems?: ShoppingListItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutPriceRecordsInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiptItems?: ReceiptItemUncheckedCreateNestedManyWithoutProductInput
    shoppingListItems?: ShoppingListItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutPriceRecordsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPriceRecordsInput, ProductUncheckedCreateWithoutPriceRecordsInput>
  }

  export type MarketCreateWithoutPriceRecordsInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptCreateNestedManyWithoutMarketInput
  }

  export type MarketUncheckedCreateWithoutPriceRecordsInput = {
    id?: string
    name: string
    displayName?: string | null
    cnpj?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptUncheckedCreateNestedManyWithoutMarketInput
  }

  export type MarketCreateOrConnectWithoutPriceRecordsInput = {
    where: MarketWhereUniqueInput
    create: XOR<MarketCreateWithoutPriceRecordsInput, MarketUncheckedCreateWithoutPriceRecordsInput>
  }

  export type ReceiptItemCreateWithoutPriceRecordsInput = {
    id?: string
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
    receipt: ReceiptCreateNestedOneWithoutItemsInput
    product?: ProductCreateNestedOneWithoutReceiptItemsInput
  }

  export type ReceiptItemUncheckedCreateWithoutPriceRecordsInput = {
    id?: string
    receiptId: string
    productId?: string | null
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
  }

  export type ReceiptItemCreateOrConnectWithoutPriceRecordsInput = {
    where: ReceiptItemWhereUniqueInput
    create: XOR<ReceiptItemCreateWithoutPriceRecordsInput, ReceiptItemUncheckedCreateWithoutPriceRecordsInput>
  }

  export type ProductUpsertWithoutPriceRecordsInput = {
    update: XOR<ProductUpdateWithoutPriceRecordsInput, ProductUncheckedUpdateWithoutPriceRecordsInput>
    create: XOR<ProductCreateWithoutPriceRecordsInput, ProductUncheckedCreateWithoutPriceRecordsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutPriceRecordsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutPriceRecordsInput, ProductUncheckedUpdateWithoutPriceRecordsInput>
  }

  export type ProductUpdateWithoutPriceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptItems?: ReceiptItemUpdateManyWithoutProductNestedInput
    shoppingListItems?: ShoppingListItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutPriceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptItems?: ReceiptItemUncheckedUpdateManyWithoutProductNestedInput
    shoppingListItems?: ShoppingListItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type MarketUpsertWithoutPriceRecordsInput = {
    update: XOR<MarketUpdateWithoutPriceRecordsInput, MarketUncheckedUpdateWithoutPriceRecordsInput>
    create: XOR<MarketCreateWithoutPriceRecordsInput, MarketUncheckedCreateWithoutPriceRecordsInput>
    where?: MarketWhereInput
  }

  export type MarketUpdateToOneWithWhereWithoutPriceRecordsInput = {
    where?: MarketWhereInput
    data: XOR<MarketUpdateWithoutPriceRecordsInput, MarketUncheckedUpdateWithoutPriceRecordsInput>
  }

  export type MarketUpdateWithoutPriceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUpdateManyWithoutMarketNestedInput
  }

  export type MarketUncheckedUpdateWithoutPriceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    cnpj?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUncheckedUpdateManyWithoutMarketNestedInput
  }

  export type ReceiptItemUpsertWithoutPriceRecordsInput = {
    update: XOR<ReceiptItemUpdateWithoutPriceRecordsInput, ReceiptItemUncheckedUpdateWithoutPriceRecordsInput>
    create: XOR<ReceiptItemCreateWithoutPriceRecordsInput, ReceiptItemUncheckedCreateWithoutPriceRecordsInput>
    where?: ReceiptItemWhereInput
  }

  export type ReceiptItemUpdateToOneWithWhereWithoutPriceRecordsInput = {
    where?: ReceiptItemWhereInput
    data: XOR<ReceiptItemUpdateWithoutPriceRecordsInput, ReceiptItemUncheckedUpdateWithoutPriceRecordsInput>
  }

  export type ReceiptItemUpdateWithoutPriceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt?: ReceiptUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneWithoutReceiptItemsNestedInput
  }

  export type ReceiptItemUncheckedUpdateWithoutPriceRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptId?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutShoppingListsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutShoppingListsInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptUncheckedCreateNestedManyWithoutUserInput
    passwordResetToken?: PasswordResetTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutShoppingListsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutShoppingListsInput, UserUncheckedCreateWithoutShoppingListsInput>
  }

  export type ShoppingListItemCreateWithoutShoppingListInput = {
    id?: string
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    product?: ProductCreateNestedOneWithoutShoppingListItemsInput
  }

  export type ShoppingListItemUncheckedCreateWithoutShoppingListInput = {
    id?: string
    productId?: string | null
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListItemCreateOrConnectWithoutShoppingListInput = {
    where: ShoppingListItemWhereUniqueInput
    create: XOR<ShoppingListItemCreateWithoutShoppingListInput, ShoppingListItemUncheckedCreateWithoutShoppingListInput>
  }

  export type ShoppingListItemCreateManyShoppingListInputEnvelope = {
    data: ShoppingListItemCreateManyShoppingListInput | ShoppingListItemCreateManyShoppingListInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutShoppingListsInput = {
    update: XOR<UserUpdateWithoutShoppingListsInput, UserUncheckedUpdateWithoutShoppingListsInput>
    create: XOR<UserCreateWithoutShoppingListsInput, UserUncheckedCreateWithoutShoppingListsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutShoppingListsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutShoppingListsInput, UserUncheckedUpdateWithoutShoppingListsInput>
  }

  export type UserUpdateWithoutShoppingListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutShoppingListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUncheckedUpdateManyWithoutUserNestedInput
    passwordResetToken?: PasswordResetTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ShoppingListItemUpsertWithWhereUniqueWithoutShoppingListInput = {
    where: ShoppingListItemWhereUniqueInput
    update: XOR<ShoppingListItemUpdateWithoutShoppingListInput, ShoppingListItemUncheckedUpdateWithoutShoppingListInput>
    create: XOR<ShoppingListItemCreateWithoutShoppingListInput, ShoppingListItemUncheckedCreateWithoutShoppingListInput>
  }

  export type ShoppingListItemUpdateWithWhereUniqueWithoutShoppingListInput = {
    where: ShoppingListItemWhereUniqueInput
    data: XOR<ShoppingListItemUpdateWithoutShoppingListInput, ShoppingListItemUncheckedUpdateWithoutShoppingListInput>
  }

  export type ShoppingListItemUpdateManyWithWhereWithoutShoppingListInput = {
    where: ShoppingListItemScalarWhereInput
    data: XOR<ShoppingListItemUpdateManyMutationInput, ShoppingListItemUncheckedUpdateManyWithoutShoppingListInput>
  }

  export type ShoppingListCreateWithoutItemsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutShoppingListsInput
  }

  export type ShoppingListUncheckedCreateWithoutItemsInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListCreateOrConnectWithoutItemsInput = {
    where: ShoppingListWhereUniqueInput
    create: XOR<ShoppingListCreateWithoutItemsInput, ShoppingListUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutShoppingListItemsInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiptItems?: ReceiptItemCreateNestedManyWithoutProductInput
    priceRecords?: PriceRecordCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutShoppingListItemsInput = {
    id?: string
    name: string
    normalizedName: string
    brand?: string | null
    category?: string | null
    unit?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    receiptItems?: ReceiptItemUncheckedCreateNestedManyWithoutProductInput
    priceRecords?: PriceRecordUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutShoppingListItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutShoppingListItemsInput, ProductUncheckedCreateWithoutShoppingListItemsInput>
  }

  export type ShoppingListUpsertWithoutItemsInput = {
    update: XOR<ShoppingListUpdateWithoutItemsInput, ShoppingListUncheckedUpdateWithoutItemsInput>
    create: XOR<ShoppingListCreateWithoutItemsInput, ShoppingListUncheckedCreateWithoutItemsInput>
    where?: ShoppingListWhereInput
  }

  export type ShoppingListUpdateToOneWithWhereWithoutItemsInput = {
    where?: ShoppingListWhereInput
    data: XOR<ShoppingListUpdateWithoutItemsInput, ShoppingListUncheckedUpdateWithoutItemsInput>
  }

  export type ShoppingListUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutShoppingListsNestedInput
  }

  export type ShoppingListUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpsertWithoutShoppingListItemsInput = {
    update: XOR<ProductUpdateWithoutShoppingListItemsInput, ProductUncheckedUpdateWithoutShoppingListItemsInput>
    create: XOR<ProductCreateWithoutShoppingListItemsInput, ProductUncheckedCreateWithoutShoppingListItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutShoppingListItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutShoppingListItemsInput, ProductUncheckedUpdateWithoutShoppingListItemsInput>
  }

  export type ProductUpdateWithoutShoppingListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptItems?: ReceiptItemUpdateManyWithoutProductNestedInput
    priceRecords?: PriceRecordUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutShoppingListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    normalizedName?: StringFieldUpdateOperationsInput | string
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiptItems?: ReceiptItemUncheckedUpdateManyWithoutProductNestedInput
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutPasswordResetTokenInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptCreateNestedManyWithoutUserInput
    shoppingLists?: ShoppingListCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetTokenInput = {
    id?: string
    name: string
    email: string
    passwordHash: string
    recommendationStrategy?: string | null
    homeLatitude?: number | null
    homeLongitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    receipts?: ReceiptUncheckedCreateNestedManyWithoutUserInput
    shoppingLists?: ShoppingListUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
  }

  export type UserUpsertWithoutPasswordResetTokenInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokenInput, UserUncheckedUpdateWithoutPasswordResetTokenInput>
    create: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokenInput, UserUncheckedUpdateWithoutPasswordResetTokenInput>
  }

  export type UserUpdateWithoutPasswordResetTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUpdateManyWithoutUserNestedInput
    shoppingLists?: ShoppingListUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    recommendationStrategy?: NullableStringFieldUpdateOperationsInput | string | null
    homeLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    homeLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipts?: ReceiptUncheckedUpdateManyWithoutUserNestedInput
    shoppingLists?: ShoppingListUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ReceiptCreateManyUserInput = {
    id?: string
    marketId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutReceiptsNestedInput
    items?: ReceiptItemUpdateManyWithoutReceiptNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput
  }

  export type ReceiptUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ShoppingListItemUpdateManyWithoutShoppingListNestedInput
  }

  export type ShoppingListUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ShoppingListItemUncheckedUpdateManyWithoutShoppingListNestedInput
  }

  export type ShoppingListUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptCreateManyMarketInput = {
    id?: string
    userId: string
    externalCode?: string | null
    sourceType?: $Enums.ReceiptSource
    totalAmount: number
    purchasedAt: Date | string
    parsingScore?: number | null
    parsingWarnings?: ReceiptCreateparsingWarningsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PriceRecordCreateManyMarketInput = {
    id?: string
    productId: string
    receiptItemId?: string | null
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type ReceiptUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReceiptsNestedInput
    items?: ReceiptItemUpdateManyWithoutReceiptNestedInput
  }

  export type ReceiptUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ReceiptItemUncheckedUpdateManyWithoutReceiptNestedInput
  }

  export type ReceiptUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    externalCode?: NullableStringFieldUpdateOperationsInput | string | null
    sourceType?: EnumReceiptSourceFieldUpdateOperationsInput | $Enums.ReceiptSource
    totalAmount?: FloatFieldUpdateOperationsInput | number
    purchasedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parsingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    parsingWarnings?: ReceiptUpdateparsingWarningsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPriceRecordsNestedInput
    receiptItem?: ReceiptItemUpdateOneWithoutPriceRecordsNestedInput
  }

  export type PriceRecordUncheckedUpdateWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    receiptItemId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordUncheckedUpdateManyWithoutMarketInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    receiptItemId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptItemCreateManyReceiptInput = {
    id?: string
    productId?: string | null
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
  }

  export type ReceiptItemUpdateWithoutReceiptInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutReceiptItemsNestedInput
    priceRecords?: PriceRecordUpdateManyWithoutReceiptItemNestedInput
  }

  export type ReceiptItemUncheckedUpdateWithoutReceiptInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutReceiptItemNestedInput
  }

  export type ReceiptItemUncheckedUpdateManyWithoutReceiptInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordCreateManyReceiptItemInput = {
    id?: string
    productId: string
    marketId: string
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type PriceRecordUpdateWithoutReceiptItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPriceRecordsNestedInput
    market?: MarketUpdateOneRequiredWithoutPriceRecordsNestedInput
  }

  export type PriceRecordUncheckedUpdateWithoutReceiptItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordUncheckedUpdateManyWithoutReceiptItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReceiptItemCreateManyProductInput = {
    id?: string
    receiptId: string
    nameRaw: string
    unit?: string | null
    quantity?: number | null
    unitPrice: number
    totalPrice?: number | null
    createdAt?: Date | string
  }

  export type PriceRecordCreateManyProductInput = {
    id?: string
    marketId: string
    receiptItemId?: string | null
    price: number
    observedAt: Date | string
    createdAt?: Date | string
  }

  export type ShoppingListItemCreateManyProductInput = {
    id?: string
    shoppingListId: string
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReceiptItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receipt?: ReceiptUpdateOneRequiredWithoutItemsNestedInput
    priceRecords?: PriceRecordUpdateManyWithoutReceiptItemNestedInput
  }

  export type ReceiptItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptId?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceRecords?: PriceRecordUncheckedUpdateManyWithoutReceiptItemNestedInput
  }

  export type ReceiptItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiptId?: StringFieldUpdateOperationsInput | string
    nameRaw?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unitPrice?: FloatFieldUpdateOperationsInput | number
    totalPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    market?: MarketUpdateOneRequiredWithoutPriceRecordsNestedInput
    receiptItem?: ReceiptItemUpdateOneWithoutPriceRecordsNestedInput
  }

  export type PriceRecordUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    receiptItemId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PriceRecordUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketId?: StringFieldUpdateOperationsInput | string
    receiptItemId?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    observedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shoppingList?: ShoppingListUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ShoppingListItemUncheckedUpdateWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    shoppingListId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemUncheckedUpdateManyWithoutProductInput = {
    id?: StringFieldUpdateOperationsInput | string
    shoppingListId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemCreateManyShoppingListInput = {
    id?: string
    productId?: string | null
    name: string
    quantity?: number | null
    unit?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShoppingListItemUpdateWithoutShoppingListInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutShoppingListItemsNestedInput
  }

  export type ShoppingListItemUncheckedUpdateWithoutShoppingListInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShoppingListItemUncheckedUpdateManyWithoutShoppingListInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}