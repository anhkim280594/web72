import {
    MenuOutlined,
    SearchOutlined
  } from '@ant-design/icons';
  import './App.css'
const Header = () => {
    return(
        <>
        <div className="header">
        <MenuOutlined style={{ fontSize: '32px' }}/>
        <h2>MOVIE <span style={{backgroundColor: '#E57721', borderRadius: '50%',width: 'fit-content', padding: '5px', height:'auto'}}>UI</span></h2>
        <SearchOutlined style={{ fontSize: '32px' }}/>
        </div>
        </>
    )
}
export default Header