export const Carousel = () => {
    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        width='151'
                                        height='233'
                                        alt="book"
                                    />
                                    <h6 className='mt-2'>Book</h6>
                                    <p>Luv2Code</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        width='151'
                                        height='233'
                                        alt="book"
                                    />
                                    <h6 className='mt-2'>Book</h6>
                                    <p>Luv2Code</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
                                <div className='text-center'>
                                    <img
                                        src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                                        width='151'
                                        height='233'
                                        alt="book"
                                    />
                                    <h6 className='mt-2'>Book</h6>
                                    <p>Luv2Code</p>
                                    <a className='btn main-color text-white' href='#'>Reserve</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                        <img
                            src={require('./../../../Images/BooksImages/book-luv2code-1000.png')}
                            width='151'
                            height='233'
                            alt="book"
                        />
                        <h6 className='mt-2'>Book</h6>
                        <p>Luv2Code</p>
                        <a className='btn main-color text-white' href='#'>Reserve</a>
                    </div>
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <a className='btn btn-outline-secondary btn-lg' href='#'>View More</a>
            </div>
        </div>
    );
}