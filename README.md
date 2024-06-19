This is a the Drobs users components for managing list of users by using an API
The api implements :

- GET /users to get the list of users => returns [{ usr_id:number, usr_name:string, usr_avatar:string }, ...]
- GET /users/{id} to get the detail for the user {id} => returns { usr_id:number, usr_name:string, usr_avatar:string }
- PUT /users/{id} to update the user {id} with a body structure { usr_id:number, usr_name:string, usr_avatar:string } => returns number of updated rows
- POST /users to create a nenw user { usr_name:string, usr_avatar:string } => returns usr_id

# Getting Started

Install the package

```bash
npm install drobs-users
```
Then simply pass your API url in prop 'url' as in the following example
```javascript
<Users url={YOUR_API_URL} />
```

# Components list

- UserList
- UserInfo
- UserForm
- UserPicture
- UserAvatar
- UserCard
- UserSave
- UserSelect
