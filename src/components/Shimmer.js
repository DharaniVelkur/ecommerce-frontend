import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const Shimmer = () =>{
    return (
        Array(20).fill(0).map((_,i)=>{return (
            <Skeleton key={i} width="14rem" height="20rem"/>
        )})
    )
}
export default Shimmer;