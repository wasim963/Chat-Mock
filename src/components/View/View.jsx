import React from 'react';
import './View.css'

const Tabs = ( props ) => {

    const { tabs, handleList } = props;

    const getFormattedDate = ( timeStamp ) => {
        const current_date = new Date( timeStamp );
        // const timestamp = current_date.getTime();
        const formatted_date = current_date.getDate() + "/" + current_date.getMonth() + "/" + current_date.getFullYear();
        return formatted_date;
    }

    return( 
        <div className={ `tabs ` }>
            <ul className='tabs__list' >
                { tabs?.length && tabs?.map( ( tab, index ) => {
                    return(
                        <li 
                            className={`tabs__list__item ${ props.activeTab === tab?.id && 'tabs__list__item__active'  } ` }
                            tabIndex={0}
                            onClick={ () =>  handleList( tab )}
                            key={index}
                        >
                            <div className='tabs__list__item__image'>
                                <img src={`${ tab.imageURL }`} alt={ `Image${ tab?.id }`} width='30px' height='30px' />
                            </div>
                            <div className='tabs__list__item__detail'>
                                <span className='tabs__list__item__detail__title' > { tab?.title } </span>
                                <span className='tabs__list__item__detail__orderId'> Order { tab?.orderId} </span>
                            </div>
                            <div className='tabs__list__item__date'>
                                <span>{  getFormattedDate(tab?.latestMessageTimestamp) }</span>
                            </div>
                        </li>
                    )
                } ) }
            </ul>
        </div>
     )
}

export const View = ( props ) => {

    const handleTabs = ( tab ) => {
        props.onChange( tab )
    }

  return (
    <>
    { props?.isFetching ? <h3>Loading ....</h3> :
        <div className='main-view' >

            <div className= { `main-view__wrapper ${ props?.activeTab && 'main-view__wrapper__tabs__list' } ` }>
                <div className='main-view__wrapper__filter' >
                    <label 
                        htmlFor='filter'>Filter By Title / Order ID</label>
                    <input 
                        type='text' id='filter'
                        onChange={ (event) =>  props?.onFilter( event.target.value )}
                        value={props?.queryString}
                    />
                </div>
                <Tabs 
                    // className= { props?.activeTab &&  'main-view__wrapper__tabs__list' }
                    tabs = { props?.tabs } 
                    handleList = { handleTabs }
                    activeTab={props.activeTab}
                />
            </div>
            {
                props?.activeTab &&
                <div className='main-view-body'>
                    { props?.activeTab && props.children }
                </div>
            }
        </div>
    }
    </>
  )
}
