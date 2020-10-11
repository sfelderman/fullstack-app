import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};


export type Query = {
  __typename?: 'Query';
  todo?: Maybe<TodoDomain>;
  plaid?: Maybe<PlaidDomain>;
};

export type TodoDomain = {
  __typename?: 'TodoDomain';
  todo?: Maybe<Todo>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};


export type TodoDomainTodoArgs = {
  id: Scalars['ID'];
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  completed: Scalars['Boolean'];
  dueDate?: Maybe<Scalars['Date']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<Todo>;
  updateTodo?: Maybe<Todo>;
  deleteTodo?: Maybe<Todo>;
  createPlaidAccount?: Maybe<PlaidAccount>;
  deletePlaidAccount?: Maybe<PlaidAccount>;
};


export type MutationCreateTodoArgs = {
  title: Scalars['String'];
  completed?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  completed?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePlaidAccountArgs = {
  accessToken: Scalars['String'];
  itemId: Scalars['ID'];
  institutionId: Scalars['ID'];
  institutionName?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  accountSubtype?: Maybe<Scalars['String']>;
};


export type MutationDeletePlaidAccountArgs = {
  id: Scalars['ID'];
};

export type PlaidDomain = {
  __typename?: 'PlaidDomain';
  getAccount?: Maybe<PlaidAccount>;
  getAccounts?: Maybe<Array<Maybe<PlaidAccount>>>;
};


export type PlaidDomainGetAccountArgs = {
  id: Scalars['ID'];
};

export type PlaidAccount = {
  __typename?: 'PlaidAccount';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  accessToken: Scalars['String'];
  itemId: Scalars['ID'];
  institutionId: Scalars['ID'];
  institutionName?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  accountSubtype?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Query: ResolverTypeWrapper<{}>;
  TodoDomain: ResolverTypeWrapper<TodoDomain>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Todo: ResolverTypeWrapper<Todo>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  PlaidDomain: ResolverTypeWrapper<PlaidDomain>;
  PlaidAccount: ResolverTypeWrapper<PlaidAccount>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  Query: {};
  TodoDomain: TodoDomain;
  ID: Scalars['ID'];
  Todo: Todo;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Mutation: {};
  PlaidDomain: PlaidDomain;
  PlaidAccount: PlaidAccount;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  todo?: Resolver<Maybe<ResolversTypes['TodoDomain']>, ParentType, ContextType>;
  plaid?: Resolver<Maybe<ResolversTypes['PlaidDomain']>, ParentType, ContextType>;
};

export type TodoDomainResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoDomain'] = ResolversParentTypes['TodoDomain']> = {
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<TodoDomainTodoArgs, 'id'>>;
  todos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'title' | 'completed'>>;
  updateTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationUpdateTodoArgs, 'id'>>;
  deleteTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, 'id'>>;
  createPlaidAccount?: Resolver<Maybe<ResolversTypes['PlaidAccount']>, ParentType, ContextType, RequireFields<MutationCreatePlaidAccountArgs, 'accessToken' | 'itemId' | 'institutionId'>>;
  deletePlaidAccount?: Resolver<Maybe<ResolversTypes['PlaidAccount']>, ParentType, ContextType, RequireFields<MutationDeletePlaidAccountArgs, 'id'>>;
};

export type PlaidDomainResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaidDomain'] = ResolversParentTypes['PlaidDomain']> = {
  getAccount?: Resolver<Maybe<ResolversTypes['PlaidAccount']>, ParentType, ContextType, RequireFields<PlaidDomainGetAccountArgs, 'id'>>;
  getAccounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlaidAccount']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PlaidAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaidAccount'] = ResolversParentTypes['PlaidAccount']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institutionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institutionName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  accountSubtype?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  TodoDomain?: TodoDomainResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PlaidDomain?: PlaidDomainResolvers<ContextType>;
  PlaidAccount?: PlaidAccountResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
