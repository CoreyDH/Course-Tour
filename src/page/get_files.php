<?php
$path=$_SERVER[SCRIPT_FILENAME]; $parts=explode("/",$path); if ($_SERVER[HTTP_HOST] == "coursetrends.com") { $location=$parts[7]; } elseif ($_SERVER[HTTP_HOST] == "www.coursetrends.com") { $location=$parts[7]; } else { $location=$parts[7];}

$imgPath = $_REQUEST['imagesPath'];

$dir = '/golf/'.$parts[6].'/'.$location.'/'.$imgPath.'/'; // Main Directory

$files = [];

$folders = preg_grep('/^([^.])/',scandir($_SERVER['DOCUMENT_ROOT'].$dir)); // Scan Folders

foreach($folders as &$folder) {

	if(isset($folder)) {
		$images = preg_grep('/^([^.])/',scandir($_SERVER['DOCUMENT_ROOT'].$dir.'/'.$folder)); // Scan Images

		foreach($images as &$image) {
			if(isset($image) && $image != '.' && $image != '..') {

				$folder = str_replace(' ','%20',$folder);
				$image = str_replace(' ','%20',$image);

				$files[] = $folder.'/'.$image;

			}
		}
	}
}

if(count($files) == 0) {
	echo $_SERVER['DOCUMENT_ROOT'].$dir;
} else {
	echo implode(',', $files);
}


?>
