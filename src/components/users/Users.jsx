import styles from './users.module.css'
let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                fullName: 'Zhora Porven',
                photoUrl: 'https://pbs.twimg.com/media/EFIiRRyXYAA_xGw?format=jpg&name=900x900',
                followed: true,
                status: "Hi,i am a Killer Goose,be careful!!",
                location: {
                    country: 'Ukraine',
                    cityName: 'Izmail'
                }
            },
            {
                id: 2,
                fullName: 'MiXyil RaskolnikoFF',
                photoUrl: 'https://img.freepik.com/premium-photo/a-duck-wearing-sunglasses-isolated-on-background_875864-671.jpg',
                followed: false,
                status: "Hi,MOTHER OF GOD!!",
                location: {
                    country: 'Ukraine',
                    cityName: 'Odessa'
                }
            },
            {
                id: 3,
                fullName: 'Ivan Myloserdnyi',
                photoUrl: 'https://th.bing.com/th/id/R.86848a8a6a3896bc5028ecc6efa51bf5?rik=Yx8NeD1z7BSRtg&riu=http%3a%2f%2fandrey-eltsov.ru%2fwp-content%2fuploads%2f2017%2f09%2fSmehAva20-300x300.jpg&ehk=uPm%2flcEuEcbW8qcUnpsCq2Se%2bCFDxEFJzpujUNT5ALA%3d&risl=&pid=ImgRaw&r=0',
                followed: true,
                status: "GA!GA!GA!GAGAGA!GAAAA!GA))0)0)MOTHERFUCKER!",
                location: {
                    country: 'Ukraine',
                    cityName: 'Odessa'
                }
            }
        ])
    }
    return <div>
        {
            props.users.map(u => <div key={u.id}>
            <span>
                <img src={u.photoUrl} alt="Фото юзера" className={styles.userPhoto}/>
                {u.followed
                    ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                    : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
            </span>
            <span>
                <span>
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.cityName}</div>
                </span>
            </span>
        </div>)
        }
    </div>
}
export default Users