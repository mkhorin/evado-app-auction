'use strict';
/**
 * Extend default translations
 */
Object.assign(Jam.I18n.defaults, {

    'Dates overlap with other bidding': 'Даты пересекаются с другими торгами',

    'End date must be greater than start date': 'Дата окончания должны быть больше даты начала',

    'This bidding is inactive': 'Эти торги не активны',

    'Value must be greater than or equal to {value}': 'Значение должно быть больше или равно {value}',

    'You cannot bid for your item': 'Вы не можете делать ставки за свой товар'
});

Jam.I18n.meta = {

    'Active': 'Активно',

    'Bid': 'Ставка',
    'Bid change step': 'Шаг изменения ставки',
    'Bid step': 'Шаг ставки',
    'Bids': 'Ставки',
    'Bidding': 'Торги',
    'Biddings': 'Торги',

    'Created at': 'Создано',
    'Creator': 'Создатель',

    'Description': 'Описание',
    'Draft': 'Черновик',

    'End date': 'Дата окончания',

    'Info': 'Информация',
    'Item': 'Товар',
    'Items': 'Товары',

    'Last bid': 'Последняя ставка',

    'Member': 'Участник',
    'Members': 'Участники',
    'Minimum value of the next bid': 'Минимальное значение следующей ставки',

    'Name': 'Название',
    'Next value': 'Следующая ставка',

    'Owner': 'Владелец',

    'Picture': 'Изображение',
    'Pictures': 'Изображения',

    'Ready': 'Готово',
    'Return bidding to editing': 'Вернуть торги на редактирование',

    'Start bidding': 'Начать торги',
    'Start bidding within the specified period': 'Начать торги в указанный период',
    'Start date': 'Дата начала',
    'Starting value': 'Начальная ставка',
    'State': 'Состояние',
    'Stop bidding': 'Остановить торги',

    'User': 'Пользователь',

    'Value': 'Значение'
};
/**
 * Переопределит перевод из общей категории метаданных
 */
Jam.I18n['meta.class.member'] = {

    'Name': 'Имя'
};