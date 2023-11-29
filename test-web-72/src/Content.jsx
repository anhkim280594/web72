import { useState } from 'react';
import { Card, Pagination, Modal } from 'antd'
import './App.css'
import data from './data'
import {PlayCircleOutlined } from '@ant-design/icons';
const { Meta } = Card;
const Content = () => {
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [item, setItem] = useState(null);

    const showModal = (item) => {
        setIsModalOpen(true);
        setItem(item)
    };
    console.log(item)
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="contentContainer">
                <h2 style={{textAlign: 'start'}}>Most Popular Movies</h2>
                <div className="contentItem">
                    {currentItems.map((item) => (
                        <>
                            <Card className='CartItem' key={item.ID} cover={<img alt="example" src={item?.image} style={{ height: '430px' }} />} onClick={() => showModal(item)}>
                                <Meta title={item?.name} description={`${item?.time} min ${item?.year}`} />
                            </Card>
                        </>
                    ))}
                </div>
                <Pagination
                    current={currentPage}
                    onChange={page => setCurrentPage(page)}
                    total={data.length}
                    pageSize={itemsPerPage}
                    style={{ paddingTop: '16px' }}
                />
            </div>
            <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={'60%'}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ width: '30%' }}>
                        <img src={item?.image} alt="example" style={{ width: '100%' }} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <h1>
                            {item?.name}
                        </h1>
                        <p>{`${item?.time} min ${item?.year}`}</p>
                        <h3>{item?.introduce}</h3>
                        <button className='btn'><PlayCircleOutlined /> PLAY MOVIE</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Content