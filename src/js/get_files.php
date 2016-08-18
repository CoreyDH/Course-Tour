<?php 

$path = $_REQUEST['imagesPath'];
$path = '/coursetour/'.$path.'/';
$files = [];

$folders = preg_grep('/^([^.])/',scandir($_SERVER['DOCUMENT_ROOT'].$path)); // Scan Folders

foreach($folders as &$folder) {
	
	if(isset($folder)) {
		$images = preg_grep('/^([^.])/',scandir($_SERVER['DOCUMENT_ROOT'].$path.'/'.$folder)); // Scan Images

		foreach($images as &$image) {
			if(isset($image) && $image != '.' && $image != '..') {
				
				$folder = str_replace(' ','%20',$folder);
				$image = str_replace(' ','%20',$image);
				
				$files[] = $folder.'/'.$image;
			
			}
		}
	}
}

echo implode(',', $files);

?>