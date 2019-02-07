<main id="main" class="main">
    <!-- ABOUT -->
    <section class="about">
        <div class="about-cases">
            {#
            вывод слайдера:
            {% for oneSlide in slides  %}
               - {{ oneSlide.name }}
               - {{ oneSlide.description }}
               - {{ oneSlide.square }}
               - {{ oneSlide.term }}
               - {{ oneSlide.cost }}
               - {{ oneSlide.url }}
                {{ oneSlide.urlTitle }}
                {{ oneSlide.imageLeftId }}
                {{ oneSlide.imageRightId }}
                {{ oneSlide.getLeftImage().pattern }}
                {{ oneSlide.getLeftImage().background }}
                {{ oneSlide.getRightImage().background }}
            {% endfor %}
            #}
            <div class="row">
                <div class="col-12 col-lg-8">
                    <div class="main-slider__wrap--first no-margin-top">
                        <div class="main-slider" data-current="1">
                            {% for oneSlide in slides %}
                            <img src="{{ oneSlide.getLeftImage().preview }}" alt="{{ oneSlide.getLeftImage().alt }}" pattern="{{ oneSlide.getLeftImage().pattern }}" class="about-cases__img about-cases__img--first"
                                style="display: inline-block">
                            {% endfor %}
                        </div>
                    </div>
                    <div class="d-none d-lg-block offset-md-1 col-md-10 offset-lg-3 col-lg-9" >
                        <div class="about-cases__slider">
                            <div class="about-cases__slider--wrap">
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="about-cases__navigation">
                                            <button class="about-cases__arrow about-cases__arrow--left"></button>
                                            <button class="about-cases__arrow about-cases__arrow--right"></button>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <p class="about-cases__title">
                                            {% for oneSlide in slides %}
                                            <a href="{{ oneSlide.url }}" class="about-cases__link--title">
                                                <span class="about-cases__title--content">{{ oneSlide.name }}</span>
                                            </a>
                                            {% endfor %}
                                        </p>
                                    </div>
                                    <div class="col-md-7">
                                        <p class="about-cases__description">
                                            {% for oneSlide in slides %}
                                            <span class="about-cases__description--content">{{ oneSlide.description }}</span>
                                            {% endfor %}
                                        </p>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="row">
                                            <div class="col-6">
                                                <p class="about-cases__area">
                                                    {% for oneSlide in slides %}
                                                    <span class="about-cases__area--content">
                                                        <img src="/img/area-icon.svg" alt="" class="about-cases__icon about-cases__icon--area svg"> {{ oneSlide.square }} м<sup>2</sup>
                                                    </span>
                                                    {% endfor %}
                                                </p>
                                            </div>
                                            <div class="col-6">
                                                <p class="about-cases__area">
                                                    {% for oneSlide in slides %}
                                                    <span class="about-cases__cost--content">
                                                        <img src="/img/ruble.svg" alt="" class="about-cases__icon about-cases__icon--area svg"> {{ oneSlide.cost }}/м<sup>2</sup>
                                                    </span>
                                                    {% endfor %}
                                                </p>
                                            </div>
                                            <div class="col-6">
                                                <p class="about-cases__time">
                                                    <img src="/img/time-icon.svg" alt="" class="about-cases__icon about-cases__icon--time svg"> {{ oneSlide.term }} мес 
                                                </p>
                                            </div>
                                            <div class="col-6">
                                                <p class="about-cases__area">
                                                    {% for oneSlide in slides %}
                                                    <a href="{{ oneSlide.url }}" class="about-cases__link">подробнее</a>
                                                    {% endfor %}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-md-block d-lg-none offset-md-1 col-md-10 offset-lg-0 col-lg-12">
                        <div class="container">
                            <div class="about-cases__slider">
                                <div class="about-cases__slider--wrap">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="about-cases__navigation">
                                                <button class="about-cases__arrow about-cases__arrow--left"></button>
                                                <button class="about-cases__arrow about-cases__arrow--right"></button>
                                            </div>
                                        </div>
                                        <div class="col-md-9">
                                            <p class="about-cases__title" data-current="1">
                                                {% for oneSlide in slides %}
                                                <a href="{{ oneSlide.url }}" class="about-cases__link--title">
                                                    <span class="about-cases__title--content">{{ oneSlide.name }}</span>
                                                </a>
                                                {% endfor %}
                                            </p>
                                        </div>
                                        <div class="col-md-7">
                                            <p class="about-cases__description" data-current="1">
                                                {% for oneSlide in slides %}
                                                <span class="about-cases__description--content">{{ oneSlide.description }}</span>
                                                {% endfor %}
                                            </p>
                                        </div>
                                        <div class="col-md-5">
                                            <div class="row">
                                                <div class="col-6">
                                                    <p class="about-cases__area">
                                                        {% for oneSlide in slides %}
                                                        <span class="about-cases__area--content">
                                                            <img src="/img/area-icon.svg" alt="" class="about-cases__icon about-cases__icon--area svg"> {{ oneSlide.square }} м<sup>2</sup>
                                                        </span>
                                                        {% endfor %}
                                                    </p>
                                                </div>
                                                <div class="col-6">
                                                    <p class="about-cases__area">
                                                        {% for oneSlide in slides %}
                                                        <span class="about-cases__cost--content">
                                                            <img src="/img/ruble.svg" alt="" class="about-cases__icon about-cases__icon--area svg"> {{ oneSlide.cost }}/м<sup>2</sup>
                                                        </span>
                                                        {% endfor %}
                                                    </p>
                                                </div>
                                                <div class="col-6">
                                                    <p class="about-cases__time">
                                                        <img src="/img/time-icon.svg" alt="" class="about-cases__icon about-cases__icon--time svg"> 3 мес
                                                    </p>
                                                </div>
                                                <div class="col-6">
                                                    <p class="about-cases__area">
                                                        {% for oneSlide in slides %}
                                                        <a href="{{ oneSlide.url }}" class="about-cases__link">подробнее</a>
                                                        {% endfor %}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-none d-lg-block col-lg-4">
                    <div class="about-cases__misson">
                        <div class="row align-items-end">
                            <div class="col-lg-6">
                                <h1 class="about-cases__caption">{{ model.missionTitle }}</h1>
                                <p class="about-cases__description">{{ model.missionText }}</p>
                                <a class="about-cases__btn" href="{{ model.missionUrl }}" title="{{ model.missionButtonTitle }}"><span class="about-cases__btn--line"></span>{{ model.missionButton }}</a>
                            </div>
                            <div class="offset-lg-2 col-lg-2">
                                <img src="/img/chair.jpg" alt="" class="about-cases__chair">
                            </div>
                            <div class="col-12">
                                <div class="main-slider__wrap main-slider__wrap--second">
                                    <div class="main-slider" data-current="1">
                                        {% for oneSlide in slides %}
                                        <img src="{{ oneSlide.getRightImage().preview }}" alt="{{ oneSlide.getRightImage().alt }}" class="about-cases__img about-cases__img--second"
                                        pattern="{{ oneSlide.getRightImage().pattern }}"  style="display: inline-block"> 
                                        {% endfor %}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-md-none">
                    <div class="container">
                        <div class="about-cases__slider">
                            <div class="about-cases__slider--wrap">
                                <div class="row">
                                    <div class="col-4">
                                        <div class="about-cases__navigation">
                                            <button class="about-cases__arrow about-cases__arrow--left"></button>
                                            <button class="about-cases__arrow about-cases__arrow--right"></button>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <p class="about-cases__title" data-current="1">
                                            {% for oneSlide in slides %}
                                            <a href="{{ oneSlide.url }}" class="about-cases__link--title">
                                                <span class="about-cases__title--content">{{ oneSlide.name }}</span>
                                            </a>
                                            {% endfor %}
                                        </p>
                                    </div>
                                    <div class="col-12">
                                        <p class="about-cases__description" data-current="1">
                                            {% for oneSlide in slides %}
                                            <span class="about-cases__description--content">{{ oneSlide.description }}</span>
                                            {% endfor %}
                                        </p>
                                    </div>
                                    <div class="col-6">
                                        <p class="about-cases__area">
                                            {% for oneSlide in slides %}
                                            <span class="about-cases__area--content">
                                                <img src="/img/area-icon.svg" alt="" class="about-cases__icon about-cases__icon--area svg"> {{ oneSlide.square }} м<sup>2</sup>
                                            </span>
                                            {% endfor %}
                                        </p>
                                    </div>
                                    <div class="col-6">
                                        <p class="about-cases__time">
                                            <img src="/img/time-icon.svg" alt="" class="about-cases__icon about-cases__icon--time svg"> 3 мес
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 d-md-none">
                    <div class="main-slider__wrap main-slider__wrap--second">
                        <div class="main-slider reveal-el-3" data-current="1">
                            {% for oneSlide in slides %}
                            <img src="{{ oneSlide.getRightImage().preview }}" alt="{{ oneSlide.getRightImage().alt }}" class="about-cases__img about-cases__img--second"
                            pattern="{{ oneSlide.getRightImage().pattern }}"  style="border-color: {{ oneSlide.getRightImage().background }}">
                            {% endfor %}
                        </div>
                    </div>
                </div>
                <div class="col-12 d-md-none">
                    <div class="about-cases__misson">
                        <div class="offset-1 col-10">
                            <p class="about-cases__caption">{{ model.missionTitle }}</p>
                            <p class="about-cases__description">{{ model.missionText }}</p>
                        </div>
                        <div class="col-12">
                            <div class="container">
                                <a class="about-cases__btn" href="{{ model.missionUrl }}" title="{{ model.missionButtonTitle }}"><span class="about-cases__btn--line"></span>{{ model.missionButton }}</a>
                            </div>
                        </div>
                        <div class="col-12">
                            <img src="/img/chair.jpg" alt="" class="about-cases__chair">
                            <span class="about-cases__chair--line"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /ABOUT -->
    <!-- PRICE -->
    <section class="price">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-12"><!-- DUMMY -->
                </div>
                <div class="col-12 col-md-10 col-lg-12" >
                        <h2 class="price__caption">{{ model.calcTitle }}</h2>
                </div>
                <div class="col-12 col-md-10 col-lg-6">
                    <div class="row">
                        <p class="d-none d-lg-block price__description">{{ model.calcDescr }}</p>
                        <div class="d-none d-lg-block col-12">
                            <img class="price__image" src="/img/price-image.png" alt="Тумба">
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-12 col-lg-6">
                    <div class="row">
                        <div class="price__area">
                            <p class="price__title">Площадь помещения м<sup>2</sup>
                            </p>
                            <div class="price__area-range-wrap">
                                <div id="area-range" class="price__area-range" value="275">
                                    <span class="price__area--bg"></span>
                                </div>
                                <ul class="price__area-labels">
                                    <li class="price__area-item">50</li>
                                    <li class="price__area-item">500</li>
                                </ul>
                            </div>
                        </div>
                        <div class="price__price">
                            <p class="price__title">Количество комнат
                            </p>
                            <div class="price__price-range-wrap">
                                <div id="price-range" class="price__price-range" value="">
                                    <span class="price__price--bg"></span>
                                </div>
                                <ul class="price__price-labels">
                                    <li class="price__price-item" data-target="100">1</li>
                                    <li class="price__price-item" data-target="200">2</li>
                                    <li class="price__price-item" data-target="300">3</li>
                                    <li class="price__price-item active" data-target="400">4</li>
                                    <li class="price__price-item" data-target="500">5</li>
                                    <li class="price__price-item" data-target="600">6</li>
                                    <li class="price__price-item" data-target="700">7</li>
                                </ul>
                            </div>
                        </div>
                        <div class="price__price">
                            <p class="price__title">Ваш номер телефона</p>
                            <form class="calc-form" action="/postCalculator" method="POST">
                                <input name="telephone" type="text" size="15" maxlength="15" class="calc-form__input" placeholder="" value="+7" required>

                                <button class="price__btn" type="submit">
                                    <span class="price__btn--line"></span>Заказать интерьер
                                </button>
                            </form>
                        </div>
                        <!-- OLD POPUP -->
                        {#
                        <div class="price__price">
                            <p class="price__title">Стоимость в рублях за м<sup>2</sup>
                            </p>
                            <div class="price__price-range-wrap">
                                <div id="price-range" class="price__price-range" value="">
                                    <span class="price__price--bg"></span>
                                </div>
                                <ul class="price__price-labels">
                                    <li class="price__price-item" data-target="100">2300</li>
                                    <li class="price__price-item" data-target="200">2900</li>
                                    <li class="price__price-item active" data-target="300">3900</li>
                                    <li class="price__price-item" data-target="400">4900</li>
                                    <li class="price__price-item" data-target="500">5900</li>
                                    <p class="price__price-content" data-target="1">{{ model.priceTxt3300 }}</p>
                                    <p class="price__price-content" data-target="2">{{ model.priceTxt3900 }}</p>
                                    <p class="price__price-content active" data-target="3">{{ model.priceTxt4800 }}</p>
                                    <p class="price__price-content" data-target="4">{{ model.priceTxt5900 }}</p>
                                    <p class="price__price-content" data-target="5">{{ model.priceTxt6900 }}</p>
                                </ul>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price-result price-result--project">
                                <p class="price-result__title">Дизайн-проект</p>
                                <p class="price-result__project">1320 т.р.</p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="price-result price-result--full">
                                <p class="price-result__title">Полная реализация</p>
                                <p class="price-result__full">от $22000</p>
                            </div>
                        </div>
                        <div class="col-12">
                            <a class="price__btn" data-fancybox data-src="#popup" href="javascript:;" rel="static" title="{{ model.calcButtonTitle }}">
                                <span class="price__btn--line"></span>{{ model.calcButton }}</a>
                        </div>#}
                        <!-- END OLD BACKUP -->
                    </div>
                </div>
                <div class="col-12 d-md-none d-xl-none">
                    <img class="price__image" src="/img/price-image.png" alt="Тумба">
                </div>
            </div>
        </div>
    </section>
    <!-- /PRICE -->
    <!-- PORTFOLIO -->
    <section class="portfolio">
        <div class="portfolio-caption" style="background-image: url('{{ model.slideImg }}');">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h3 class="portfolio-caption__subtitle">От идеи до реализации</h3>
                    </div>
                    <div class="col-12">
                        <a href="{{ model.slideUrl}}" class="portfolio-caption__title">
                            <span class="portfolio-caption__box-left"></span>{{ model.slideTitle }}<span class="portfolio-caption__box-right"></span>
                        </a>
                    </div>
                    <div class="col-12">
                        <a href="{{ model.slideUrl}}" class="portfolio-caption__link">
                            <!-- <div id="lottie"></div> -->
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="d-none d-md-block offset-md-3 col-md-8 offset-lg-2 col-lg-4">
                <a href="{{ model.getLeftImage().url}}">
                    <img class="portfolio__image portfolio__image--first" src="{{ model.getLeftImage().preview}}" pattern="{{ model.getLeftImage().pattern}}" style="background-color: {{ model.getLeftImage().background}}; border-color: {{ model.getLeftImage().background}};"
                    alt="">
                </a>
                <div class="d-none d-lg-block col-12">
                    <div class="portfolio-about">
                        <h2 class="portfolio-about__title">В стоимость дизайн-проекта входят</h2>
                        <ul class="portfolio-about__list">
                            {% for oneLink in model.getRelated('Link') %}
                            <li class="portfolio-about__item">
                                <a href="{{ oneLink.url}}" class="portfolio-about__item--link">{{ oneLink.title}}</a>
                            </li>
                            {% endfor %}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-10 offset-md-1 offset-lg-0 col-lg-4">
                <div class="portfolio-table">
                    <div class="row">
                        <div class="col-12 d-none d-lg-block">
                            <h2 class="portfolio-table__title">Мы создаем дизайн интерьера для</h2>
                        </div>
                        <div class="col-12 d-lg-none">
                            <h2 class="portfolio-table__title">Мы создаем дизайн для</h2>
                        </div>
                        <div class="col-4">
                            <a href="/journal/dizajn-kvartiry" class="portfolio-table__item">Квартир</a>
                        </div>
                        <div class="col-8">
                            <a href="/dizain-townhouse" class="portfolio-table__item">Таунхаусов</a>
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-6">
                                    <a href="/dizain-kottedzha" class="portfolio-table__item">Коттеджей</a>
                                </div>
                                <div class="col-6">
                                    <a href="/dizain-kafe" class="portfolio-table__item">Кафе</a>
                                </div>
                                <div class="col-12">
                                    <a href="/dizain-restorana" class="portfolio-table__item">Ресторанов</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <a href="/dizain-butika" class="portfolio-table__item portfolio-table__item--full">Бутиков</a>
                        </div>
                    </div>
                </div>
                <div class="d-none d-md-block col-md-8 col-lg-12">
                    <a href="{{ model.getRightImage().url}}">
                        <img class="portfolio__image portfolio__image--second" src="{{ model.getRightImage().preview }}" pattern="{{ model.getRightImage().pattern}}" style="background-color: {{ model.getRightImage().background}}; border-color: {{ model.getRightImage().background}};"
                        alt="">
                    </a>
                </div>
                <div class="d-none d-md-block d-lg-none offset-2 col-8">
                    <div class="portfolio-about">
                        <h2 class="portfolio-about__title">В стоимость проекта входят</h2>
                        <ul class="portfolio-about__list">
                            {% for oneLink in model.getRelated('Link') %}
                            <li class="portfolio-about__item">
                                <a href="{{ oneLink.url}}" class="portfolio-about__item--link">{{ oneLink.title}}</a>
                            </li>
                            {% endfor %}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-md-none">
                <a href="{{ model.getLeftImage().url}}">
                    <img class="portfolio__image portfolio__image--first" src="{{ model.getLeftImage().img}}" pattern="{{ model.getLeftImage().pattern}}" style="background-color: {{ model.getLeftImage().background}}; border-color: {{ model.getLeftImage().background}};"
                    alt="">
                </a>
            </div>
            <div class="col-12 d-md-none">
                <div class="portfolio-about">
                    <h2 class="portfolio-about__title">В стоимость проекта входят</h2>
                    <ul class="portfolio-about__list">
                        {% for oneLink in model.getRelated('Link') %}
                        <li class="portfolio-about__item">
                            <a href="{{ oneLink.url}}" class="portfolio-about__item--link">{{ oneLink.title}}</a>
                        </li>
                        {% endfor %}
                    </ul>
                </div>
            </div>
            <div class="col-12 d-md-none">
                <a href="{{ model.getRightImage().url}}">
                    <img class="portfolio__image portfolio__image--second" src="{{ model.getRightImage().img }}" pattern="{{ model.getRightImage().pattern}}" style="background-color: {{ model.getRightImage().background}}; border-color: {{ model.getRightImage().background}};"
                    alt="">
                </a>
            </div>
        </div>
    </section>
    <!-- /PORTFOLIO -->
</main>
<!-- NEW FOOTER -->
<div class="footer-new">
    <div class="footer-main">
        <h2 class="footer__text">Дизайн проект квартиры от 120.000 рублей</h2> 
        <a class="footer__btn" data-fancybox data-src="#popup" href="javascript:;" rel="static" >
            <span class="footer__btn--line"></span>Оставить заявку
        </a>     
    </div>
</div>