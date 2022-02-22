/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * A field whose value matches /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.
     */
    email<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "EmailAddress";
    /**
     * A string that cannot be passed as an empty value
     */
    nonEmptyString<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "NonEmptyString";
    /**
     * A field whose value matches /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/.
     */
    password<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Password";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * A field whose value matches /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.
     */
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "EmailAddress";
    /**
     * A string that cannot be passed as an empty value
     */
    nonEmptyString<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "NonEmptyString";
    /**
     * A field whose value matches /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/.
     */
    password<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Password";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  EmailAddress: any
  NonEmptyString: any
  Password: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    accessToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  Task: { // root type
    completed: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    id: string; // String!
    title: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  UpdateUserPayload: { // root type
    message: string; // String!
    user?: NexusGenRootTypes['User'] | null; // User
  }
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    id: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: NexusGenScalars['NonEmptyString']; // NonEmptyString!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    accessToken: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createTask: NexusGenRootTypes['Task']; // Task!
    deleteAllTasks: string; // String!
    deleteTask: NexusGenRootTypes['Task']; // Task!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    logout: string; // String!
    logoutEverywhere: string; // String!
    register: NexusGenRootTypes['User']; // User!
    resetPassword: string; // String!
    updateTask: NexusGenRootTypes['Task']; // Task!
    updateUser: NexusGenRootTypes['UpdateUserPayload']; // UpdateUserPayload!
    verify: string; // String!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User']; // User!
    sendPasswordResetCodeEmail: string; // String!
    sendVerificationEmail: string; // String!
  }
  Task: { // field return type
    completed: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    id: string; // String!
    title: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
  UpdateUserPayload: { // field return type
    message: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    id: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    tasks: NexusGenRootTypes['Task'][]; // [Task!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: NexusGenScalars['NonEmptyString']; // NonEmptyString!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    accessToken: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    createTask: 'Task'
    deleteAllTasks: 'String'
    deleteTask: 'Task'
    login: 'AuthPayload'
    logout: 'String'
    logoutEverywhere: 'String'
    register: 'User'
    resetPassword: 'String'
    updateTask: 'Task'
    updateUser: 'UpdateUserPayload'
    verify: 'String'
  }
  Query: { // field return type name
    me: 'User'
    sendPasswordResetCodeEmail: 'String'
    sendVerificationEmail: 'String'
  }
  Task: { // field return type name
    completed: 'Boolean'
    createdAt: 'DateTime'
    description: 'NonEmptyString'
    id: 'String'
    title: 'NonEmptyString'
    updatedAt: 'DateTime'
    user: 'User'
  }
  UpdateUserPayload: { // field return type name
    message: 'String'
    user: 'User'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    email: 'EmailAddress'
    id: 'NonEmptyString'
    tasks: 'Task'
    updatedAt: 'DateTime'
    username: 'NonEmptyString'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createTask: { // args
      description: NexusGenScalars['NonEmptyString']; // NonEmptyString!
      title: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    }
    deleteTask: { // args
      id: string; // String!
    }
    login: { // args
      email: NexusGenScalars['EmailAddress']; // EmailAddress!
      password: string; // String!
    }
    register: { // args
      email: NexusGenScalars['EmailAddress']; // EmailAddress!
      password: NexusGenScalars['Password']; // Password!
      username: NexusGenScalars['NonEmptyString']; // NonEmptyString!
    }
    resetPassword: { // args
      id: string; // String!
      password: NexusGenScalars['Password']; // Password!
      passwordResetCode: string; // String!
    }
    updateTask: { // args
      description?: NexusGenScalars['NonEmptyString'] | null; // NonEmptyString
      id: string; // String!
      title?: NexusGenScalars['NonEmptyString'] | null; // NonEmptyString
    }
    updateUser: { // args
      email?: NexusGenScalars['EmailAddress'] | null; // EmailAddress
      password?: NexusGenScalars['Password'] | null; // Password
      username?: NexusGenScalars['NonEmptyString'] | null; // NonEmptyString
    }
    verify: { // args
      id: string; // String!
      verificationCode: string; // String!
    }
  }
  Query: {
    sendPasswordResetCodeEmail: { // args
      email: string; // String!
    }
    sendVerificationEmail: { // args
      email: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}