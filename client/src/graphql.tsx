import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  users?: Maybe<PaginatedUser>;
  user?: Maybe<User>;
  currentUser?: Maybe<User>;
};


export type QueryPostsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  user?: Maybe<UserSearchArgs>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  items: Array<Post>;
  total?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  creator: User;
  likedBy: Array<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contentSnippet: Scalars['String'];
  comments: PaginatedComments;
};


export type PostCommentsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  birth?: Maybe<Scalars['DateTime']>;
  position?: Maybe<Scalars['String']>;
  education?: Maybe<Scalars['String']>;
  cell?: Maybe<Scalars['String']>;
  skype?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Scalars['String']>>;
  _id: Scalars['ID'];
  id: Scalars['ID'];
  email: Scalars['String'];
  friends: Array<User>;
  roles: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt: Scalars['DateTime'];
  posts: PaginatedPosts;
};


export type UserPostsArgs = {
  post?: Maybe<PostSearchArgs>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type PostSearchArgs = {
  title?: Maybe<Scalars['String']>;
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  items: Array<Comment>;
  total?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  id: Scalars['ID'];
  text: Scalars['String'];
  post: Post;
  author: User;
  likedBy: Array<User>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contentSnippet: Scalars['String'];
};

export type PaginatedUser = {
  __typename?: 'PaginatedUser';
  items: Array<User>;
  total?: Maybe<Scalars['Int']>;
  hasMore?: Maybe<Scalars['Boolean']>;
};

export type UserSearchArgs = {
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  birth?: Maybe<Scalars['DateTime']>;
  position?: Maybe<Scalars['String']>;
  education?: Maybe<Scalars['String']>;
  cell?: Maybe<Scalars['String']>;
  skype?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Scalars['String']>>;
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  likePost: Post;
  dislikePost: Post;
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Post;
  changePassword: User;
  updateUserProfile: User;
  makeFriend: User;
  register: AuthorizedUser;
  login: AuthorizedUser;
  logout: Scalars['Boolean'];
  deletePage: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  text: Scalars['String'];
  post: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['ID'];
};


export type MutationDislikePostArgs = {
  id: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUpdateUserProfileArgs = {
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  birth?: Maybe<Scalars['DateTime']>;
  position?: Maybe<Scalars['String']>;
  education?: Maybe<Scalars['String']>;
  cell?: Maybe<Scalars['String']>;
  skype?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Scalars['String']>>;
};


export type MutationMakeFriendArgs = {
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type AuthorizedUser = {
  __typename?: 'AuthorizedUser';
  token: Scalars['String'];
  user: User;
};

export type UpdateProfileMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  birth?: Maybe<Scalars['DateTime']>;
  position?: Maybe<Scalars['String']>;
  education?: Maybe<Scalars['String']>;
  cell?: Maybe<Scalars['String']>;
  skype?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  skills?: Maybe<Array<Scalars['String']>>;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfile: (
    { __typename?: 'User' }
    & Pick<User, 'name' | 'surname' | 'avatar' | 'city' | 'birth' | 'position' | 'education' | 'cell' | 'skype' | 'department' | 'description' | 'skills' | 'email'>
  ) }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'surname' | 'avatar' | 'city' | 'birth' | 'position' | 'education' | 'cell' | 'skype' | 'department' | 'description' | 'skills' | 'email'>
  )> }
);

export type MainPageQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type MainPageQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & { items: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'text' | 'createdAt'>
    )> }
  ) }
);

export type PostsQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & { items: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'title' | 'text'>
    )> }
  ) }
);


export const UpdateProfileDocument = gql`
    mutation UpdateProfile($name: String, $surname: String, $avatar: String, $city: String, $birth: DateTime, $position: String, $education: String, $cell: String, $skype: String, $department: String, $description: String, $skills: [String!]) {
  updateUserProfile(
    name: $name
    surname: $surname
    avatar: $avatar
    city: $city
    birth: $birth
    position: $position
    education: $education
    cell: $cell
    skype: $skype
    department: $department
    description: $description
    skills: $skills
  ) {
    name
    surname
    avatar
    city
    birth
    position
    education
    cell
    skype
    department
    description
    skills
    email
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      surname: // value for 'surname'
 *      avatar: // value for 'avatar'
 *      city: // value for 'city'
 *      birth: // value for 'birth'
 *      position: // value for 'position'
 *      education: // value for 'education'
 *      cell: // value for 'cell'
 *      skype: // value for 'skype'
 *      department: // value for 'department'
 *      description: // value for 'description'
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    name
    surname
    avatar
    city
    birth
    position
    education
    cell
    skype
    department
    description
    skills
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const MainPageDocument = gql`
    query MainPage($take: Int, $skip: Int) {
  posts(take: $take, skip: $skip) {
    items {
      title
      text
      createdAt
    }
  }
}
    `;

/**
 * __useMainPageQuery__
 *
 * To run a query within a React component, call `useMainPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMainPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMainPageQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useMainPageQuery(baseOptions?: Apollo.QueryHookOptions<MainPageQuery, MainPageQueryVariables>) {
        return Apollo.useQuery<MainPageQuery, MainPageQueryVariables>(MainPageDocument, baseOptions);
      }
export function useMainPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MainPageQuery, MainPageQueryVariables>) {
          return Apollo.useLazyQuery<MainPageQuery, MainPageQueryVariables>(MainPageDocument, baseOptions);
        }
export type MainPageQueryHookResult = ReturnType<typeof useMainPageQuery>;
export type MainPageLazyQueryHookResult = ReturnType<typeof useMainPageLazyQuery>;
export type MainPageQueryResult = Apollo.QueryResult<MainPageQuery, MainPageQueryVariables>;
export const PostsDocument = gql`
    query Posts($take: Int, $skip: Int) {
  posts(take: $take, skip: $skip) {
    items {
      title
      text
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;