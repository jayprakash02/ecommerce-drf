; (function ($) {

    "use strict";
    //Api url creation
    var apiurl = ""
    if (window.location.href == "http://127.0.0.1:5500/index.html")
        apiurl = "http://127.0.0.1:8000/";
    else apiurl = "https://ecommerce-drf.herokuapp.com/";

    getProducts();
    getBanners();

    function getProducts() {
        $.get(apiurl + "product/", (product) => {
            renderProducts(product);
        })
    }
    function createTemplate(product) {
        return `
      <div class="col-6 col-xl-3 p-1">
                    <div class="wow fadeInUp" data-wow-delay=".0s">
                        <div class="card card-fill">
                            <div class="card-image">
                                <a href="#" data-toggle="modal" data-target="#${product.id}">
                                    <img src="${product.image}" class="card-img-top img-hover" alt="${product.name}">
                                </a>
                            </div>
                            <div class="card-body p-3 p-lg-4">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h2 class="card-title mb-1 h5">
                                            <a href="#" class="text-dark">
                                                ${product.name}
                                            </a>
                                        </h2>
                                        <small class="pre-label text-muted">
                                            <span>${product.discount_price}</span>
                                            <s>${product.price}</s>
                                        </small>
                                    </div>
                                    <div>
                                        <a href="#" class="d-inline-block" data-toggle="tooltip" data-placement="top" title="Add to cart">
                                            <i class="icon icon-cart font-size-xl"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal fade" id="${product.id}" tabindex="-1" role="dialog" aria-labelledby="${product.id}Title" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="${product.id}Title">${product.name}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                    <section class="bg-white py-3">
                    <div class="container">
                        <div class="row align-items-lg-center">
                            <!-- Product gallery -->
                            <div class="col-lg-7 col-xl-8 pb-5">
                            <a href="#" data-toggle="modal" data-target="#${product.id}">
                            <img src="${product.image}" class="card-img-top img-hover" alt="${product.name}">
                        </a>
                                </div>

                            <!-- Product info -->

                            <div class="col-lg-5 col-xl-4">
                                <div class="bg-light shadow-sm br-sm p-3 p-lg-4">

                                    <!-- Product order -->

                                    <div class="clearfix">

                                        <!-- Product price -->

                                        <div class="h2 mb-0">
                                            <span>Rs ${product.discount_price}</span>
                                            <small>
                                                <del>Rs ${product.price}</del>
                                            </small>
                                        </div>

                                        <hr>

                                        <!-- Product brand -->

                                        <div class="row">
                                            <div class="col-6 col-lg-12">
                                                <div class="row mb-2">
                                                    <div class="col-xl-4">
                                                        <span class="text-muted">Shipping</span>
                                                    </div>
                                                    <div class="col-xl-8">
                                                        <i class="icon icon-checkmark-circle"></i> Free shipping
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6 col-lg-12">
                                                <div class="row mb-2">
                                                    <div class="col-xl-4">
                                                        <span class="text-muted">Availability</span>
                                                    </div>
                                                    <div class="col-xl-8">
                                                        <i class="icon icon-checkmark-circle"></i> In stock
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr>

                                        <!-- Product size -->

                                        <!-- Product quantity -->

                                        <div class="mb-2">
                                            <div class="row">
                                                <div class="col">
                                                    <button class="btn btn-block btn-primary">
                                                        <i class="icon icon-cart"></i> Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <hr>

                                    </div>

                                    <!-- Add to basket -->
                                    <div class="btn-group w-100">
                                    <span class="btn btn-sm btn-outline-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                                        <span class="show"><i class="fa fa-heart-o"></i> Whish</span>
                                        <span class="hide"><i class="fa fa-heart"></i> Whislisted</span>
                                    </span>
                                    <span class="btn btn-sm btn-outline-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                                        <span class="show"><i class="fa fa-eye-slash"></i> Watch</span>
                                        <span class="hide"><i class="fa fa-eye"></i> Watching</span>
                                    </span>
                                </div>
                                    


                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                    </div>
                  </div>
                </div>
              </div>
        `;
    }

    function renderProducts(products) {
        const template = products.length === 0 ? `<p class="text-center">No matching results found.</p>` : products.map((product) => createTemplate(product)).join("\n");
        $("#products").html(template);
    }

    function getBanners() {
        $.get(apiurl + "banner/", (banners) => {
            renderBanners(banners);
        })
    }
    function bannerTemplate(banners) {
        return `<div class="col-lg-4 mb-4 mb-lg-0">
        <div class="wow fadeInUp" data-wow-delay=".2s">
            <div class="box box-image box-hover-fall br-sm" style="background-image:url(${banners.image})">
                <div class="box-spacer-xl"></div>
                <div class="box-content">
                    <h2 class="display-4 font-family-body text-white">
                        <strong>${banners.quote}</strong>
                    </h2>
                    <p><span><a href="#" class="text-muted">${banners.tag1}</a></span></p>
                    <p><span><a href="#" class="text-muted">${banners.tag2}</a></span></p>
                    <p><span><a href="#" class="text-muted">${banners.tag3}</a></span></p>
                </div>
            </div>
        </div>
    </div>`
    }
    function renderBanners(banners) {
        const template = banners.length === 0 ? `hello` : banners.map((banner) => bannerTemplate(banner)).join("\n");
        $("#banners").html(template);
    }

})(jQuery);


