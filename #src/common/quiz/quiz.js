class Quiz {
    constructor(parentEl) {
        this.parentEl = parentEl;
        this.btnBack = parentEl.querySelector('.quiz__btn-back');
        this.state = {};

        this._init();
    }

    _init() {
        this._createState();

        this._setActive(this.state['0'])

        this._toggleShowBtnBack(false);

        this.btnBack.addEventListener('click', this.prev.bind(this));
    }

    _createState() {
        let firstItems = this.parentEl.querySelectorAll('.quiz__body > .quiz__item');
        firstItems.forEach((item, index) => {
            let children = item.querySelectorAll('.quiz__item');

            this.state[index] = {
                el: item,
                active: false,
                children: children.length 
                ? { ...Array.from(children).map((item, index) => {
                    return {
                        el: item,
                        active: false,
                    }
                })}
                : null,
            };
        })
    }

    _toggleShowBtnBack(state = false) {
        if(state) {
            this.btnBack.classList.add('show'); 
        } else {
            this.btnBack.classList.remove('show'); 
        }
    }

    _setActive(prop) {
        prop.el.classList.add('active');
        prop.active = true;

        if(prop.children) {
            this._setActive(prop.children[0]);
        }
    }

    _removeActive(prop) {
        prop.el.classList.remove('active');
        prop.active = false;

        if(prop.children) {
            this._removeActive(prop.children[0]);
        }
    }

    next() {
        setTimeout(() => {
            for(let key in this.state) {
                if(this.state[key].active) {
                    if(this.state[key].children) {
                        let items = this.state[key].children;
    
                        for(let key in items) {
                            if(key != Object.keys(items).length - 1) {
                                if(items[key].active) {
                                    this._removeActive(items[key]);
                                    this._setActive(items[+key + 1]);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }, 100);
    }

    prev() {
        for(let key in this.state) {
    
            if(this.state[key].active) {
                if(this.state[key].children  && this.state[key].children[0].active) {
                    this._removeActive(this.state[key]);
                    this._removeActive(this.state[key].children[0]);
                    this._setActive(this.state[0]);
                    this._toggleShowBtnBack(false);
                } else if(this.state[key].children) {
                    let items = this.state[key].children;

                    for(let key in items) {
                        if(items[key].active) {
                            this._removeActive(items[key]);
                            this._setActive(items[+key - 1]);
                            break;
                        }
                    }
                }
            }
        }
    }

    toStart() {
        this._toggleShowBtnBack(false);

        for(let key in this.state) {
            if(key == 0) {
                this._setActive(this.state[key]);
            } else if(this.state[key].active) {
                this._removeActive(this.state[key]);

                if(this.state[key].children) {
                    let items = this.state[key].children;

                    for(let key in items) {
                        if(items[key].active) {
                            this._removeActive(items[key]);
                        }
                    }
                }
            }
        }
    }

    showMessage() {
        this._toggleShowBtnBack(false);

        for(let key in this.state) {
            if(key == Object.keys(this.state).length - 1) {
                this._setActive(this.state[key]);
            } else if(this.state[key].active) {
                this._removeActive(this.state[key]);

                if(this.state[key].children) {
                    let items = this.state[key].children;

                    for(let key in items) {
                        if(items[key].active) {
                            this._removeActive(items[key]);
                        }
                    }
                }
            }
        }
    }

    setWay(value) {
        setTimeout(() => {
            for(let key in this.state) {
                if(key === value.toString()) {
                    this._setActive(this.state[key]);
                } else {
                    this._removeActive(this.state[key]);
                }
            }

            if(value != 0 && value != Object.keys(this.state).length - 1) {
                this._toggleShowBtnBack(true);
            }
    
        }, 100);

    }
}


let quizBlock = document.querySelector('.quiz');
if (quizBlock) {
    window.quiz = new Quiz(quizBlock);

    function setArror(el, text = 'Required!') {
        let parent = el.parentElement;
        if (!parent.classList.contains('error')) {
            parent.classList.add('error');
            parent.insertAdjacentHTML('beforeend', `<div class="error-text">${text}</div>`)
        }
    }
    
    function removeError(el) {
        let parent = el.parentElement;
        parent.classList.remove('error');
        let div = parent.querySelector('.error-text');
        if (div) {
            div.remove();
        }
    }
    

    // (function quizDateHandler() {
    //     let inputsHiddenDate = quizBlock.querySelectorAll('.date-input-wrap');
    //     if (inputsHiddenDate.length) {
    //         inputsHiddenDate.forEach(inputWrap => {
    //             let input = inputWrap.firstElementChild;

    //             // datepicker(input, {
    //             //     formatter: (input, date, instance) => {
    //             //         const value = date.toLocaleDateString();
    //             //         input.value = value;

    //             //         let parent = inputWrap.closest('.item-quiz__answers');
    //             //         let year = parent.querySelector('._year');
    //             //         let month = parent.querySelector('._month');
    //             //         let day = parent.querySelector('._day');

    //             //         year.value = date.getFullYear();
    //             //         month.value = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1);
    //             //         day.value = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate();

    //             //         quiz.next();
    //             //     },
    //             //     alwaysShow: true,
    //             //     onSelect: function (input, instance, date) {
    //             //         let parent = inputWrap.closest('.item-quiz__answers');
    //             //         let datapicer = parent.querySelector('.qs-datepicker-container');
    //             //         datapicer.classList.remove('show');
    //             //     }
    //             // });

    //             // inputWrap.addEventListener('click', () => {
    //             //     let parent = inputWrap.closest('.item-quiz__answers');
    //             //     let datapicer = parent.querySelector('.qs-datepicker-container');
    //             //     datapicer.classList.add('show');
    //             // })

    //         })
    //     }
    // })()

    let selecDateButtons = quizBlock.querySelectorAll('.select-date');
    if(selecDateButtons.length) {
        selecDateButtons.forEach(button => {
            let form = button.closest('form');
            let parentItem = button.closest('.item-quiz');
            let selects = parentItem.querySelectorAll('select');

            selects.forEach(select => {
                let parent = select.closest('.select');
                parent.addEventListener('click', () => {
                    removeError(select);
                })
            })

            button.addEventListener('click', (e) => {
                e.preventDefault();

                let result = Array.from(selects).map(select => {
                    if(!select.value.trim()) {
                        setArror(select);
                        return false;
                    } else {
                        return true;
                    }
                }).every(i => i === true);

                if(result) {
                    quiz.next();
                }
            })
        })
    }

    let startInputs = quizBlock.querySelectorAll('input[name="start-q"]');
    if(startInputs.length) {
        startInputs.forEach(input => {
            input.addEventListener('click', () => {
                quiz.setWay(input.value);
            })
        })
    }

    let otherInputsRadio = quizBlock.querySelectorAll('input[type="radio"]:not([name="start-q"])');
    if(otherInputsRadio.length) {
        otherInputsRadio.forEach(input => {
            input.addEventListener('click', () => {
                quiz.next();
            })
        })
    }

    let submitButtons = quizBlock.querySelectorAll('button[type="submit"]');
    if(submitButtons.length) {
        submitButtons.forEach(button => {

            let form = button.closest('form');
            let parentItem = button.closest('.item-quiz');
            let inputs = parentItem.querySelectorAll('input[type="text"]');

            if(inputs.length) {
                inputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        removeError(input);
                    })
                })
            }

            button.addEventListener('click', (e) => {
                e.preventDefault();

                let result = Array.from(inputs).map(input => {
                    if(!input.value.trim()) {
                        setArror(input);
                        return false;
                    } else {
                        return true;
                    }
                }).every(i => i === true);

                if(result) {
                    let event = new Event('submit', {bubbles: true});
                    form.dispatchEvent(event);
                }
            })
        })
    }
}

