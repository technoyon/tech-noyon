import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore <span>Menu</span> </h1>
             <p className='explore-menu-text'>From the latest devices to reliable repairs and honest advice, I’m here for you before, during, and after every purchase.</p>
             <div className="explore-menu-list">
              {menu_list.map((item,index)=>{
                return (
                  <div onClick={()=>setCategory(prev=>prev===item.menu_name? "All":item.menu_name)}  key={index} className='explore-menu-list-item'>
                        {/* <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/> */}
                        <p className={category===item.menu_name?"active":""}>{item.menu_name}</p>   
                        {/* do not want to show the image, thats why i use className={category===item.menu_name?"active":""} from the img tag to the p tag */}
                  </div>
                )
              })}
             </div>
             <hr/>
    </div>
  )
}

export default ExploreMenu