import '../styles/component-styles/BookLog.css'

export default function BookLog(){

    return (
            <div className='book-log'>
                <h1>Book Log</h1>
                
                <div className='bl-table-container'>
                    <div className='bl-table-header'>
                        <div className='bl-th-cell-info'>Info</div>
                        <div className='bl-th-cell-status'>Status</div>
                        <div className='bl-th-cell-deadline'>Deadline</div>
                    </div>
                    <div className='bl-table-body'>
                        <div className='bl-table-row'>
                            <div className='bl-tb-cell-info'>
                                <span className='bl-amount'>$0.00</span>
                                <span className='bl-type'>lent to User</span>
                                <span className='bl-time'>Yesterday</span>
                                <span className='bl-reason'>Poker</span>
                            </div>
                            <div className='bl-tb-cell-status'><span>Pending</span></div>
                            <div className='bl-tb-cell-deadline'><span>Nov 10, 2024</span></div>
                        </div>
                        <div className='bl-table-row'>
                            <div className='bl-tb-cell-info'>
                                <span className='bl-amount'>$0.00</span>
                                <span className='bl-type'>borrowed from User</span>
                                <span className='bl-time'>Today</span>
                                <span className='bl-reason'>Poker</span>
                            </div>
                            <div className='bl-tb-cell-status'><span>Complete</span></div>
                            <div className='bl-tb-cell-deadline'><span>None</span></div>
                        </div>
                    </div>
                </div>
                              
            </div>
    );
}