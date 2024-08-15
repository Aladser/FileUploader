<?php

namespace App\Services;

/** Загрузчик файлов на сервер */
class FileUploader
{
    /**
     * Загружает файлы из кэша браузера на сервер из массива $_FILES[$key].
     *
     * @param string $image_folder_path папка загрузки файлов на сервере
     * @param string $key               ключ $_FILES
     * @param string $prefix            префикс названия файлов
     *
     * @return array массив url-путей файлов
     */
    public static function upload(string $image_folder_path, string $prefix = '', string $key = 'images'): array
    {
        $file_url_array = [];
        if (array_key_exists($key, $_FILES)) {
            if (gettype($_FILES[$key]['tmp_name']) == 'array') {
                try {
                    for ($i = 0; $i < count($_FILES[$key]['tmp_name']); ++$i) {
                        // формирование имени файла
                        $image_name = $prefix.'_'.$_FILES[$key]['name'][$i];
                        // сохранение изображения из кэша браузера
                        $is_uploaded = move_uploaded_file($_FILES[$key]['tmp_name'][$i], $image_folder_path.$image_name);
                        if ($is_uploaded) {
                            // добавление в массив url-путей изображений для отдачи фронтенду
                            array_push($file_url_array, '/'.env('MEDIA_ROOT').'/'.$image_name);
                        }
                    }
                } catch (\Exception $e) {
                    var_dump($e);
                }
            }
        }

        return $file_url_array;
    }
}
