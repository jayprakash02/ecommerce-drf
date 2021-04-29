$(document).ready(function () {

    "use strict";
    //Api url creation
    var apiurl = ""
    var key = ""
    if ((window.location.href).includes("127.0.0.1"))
        apiurl = "http://127.0.0.1:8000/";
    else apiurl = "https://ecommerce-drf.herokuapp.com/";

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + (30 * 24 * 60 * 60 * 1000));

    key = $.cookie('eco_drf_key');
    if (key === undefined) {
        key = $.cookie('eco_drf_key', uuidv4(), { expires: expDate, SameSite: 'none' });
    }
    console.log(key)


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
                                <a href="#" data-toggle="modal" data-target="#templateModal" data-title="${product.name}"  data-image="${product.image}" data-price="${product.price}" data-discount="${product.discount_price}">
                                    <img src="${product.image}" class="card-img-top img-hover" >
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

    $("#templateModal").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget);
        var modal = $(this);
        modal.find(".modal-title").text(button.data("title"));
        modal.find(".modal-image").attr("src", button.data("image"));
        modal.find(".modal-price").text(button.data("price"));
        modal.find(".modal-discount").text(button.data("discount"));
    });
    $('.loader').removeClass('loaded');
    getProducts();
    getBanners();
    $('.loader').addClass('loaded');

});


