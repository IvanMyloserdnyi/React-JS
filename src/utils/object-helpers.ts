
export const updateObjectInArray = (items: any ,itemId: any , objPropName: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
    //state.usersData.map(u => {
    //                     if (u.id === action.userId) {
    //                         return {...u,followed: false}
    //                     }
    //                     return u
    //                 })
}