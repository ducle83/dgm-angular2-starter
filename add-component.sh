INPUTNAME="$1"

length=${#INPUTNAME}
if [ $length -lt 3 ]; then
	echo !!!!!! ERROR: COMPONENT NAME NEED TO HAVE AT LEAST 3 CHARACTERS !!!!!!
	exit 
fi

CURR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CLASSNAME=""
IFS='-' read -ra FRAG <<< "$INPUTNAME"
for i in "${FRAG[@]}"; do
	UPPER="$(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"
	CLASSNAME="${CLASSNAME}${UPPER}"
done

NAME="${INPUTNAME}.component"
SELECTORNAME="${INPUTNAME}" 
COMPONENT_FOLDER_NAME=${INPUTNAME}
PATH_TO_COMPONENT="${CURR_DIR}/src/app/components/${COMPONENT_FOLDER_NAME}"

PATH_TO_TMPL="${CURR_DIR}/src/app/components/__template"
if [ ! -d "${PATH_TO_TMPL}" ]; then
	echo !!!!!! ERROR: CANNOT FOUND TEMPLATE FOLDER - NEED TO EXECUTE IN ROOT FOLDER !!!!!!
	exit
fi

if [ -d "${PATH_TO_COMPONENT}" ]; then
    echo !!!!!! ERROR: COMPONENT EXISTED! Cannot overwrite. !!!!!!
    exit
fi

mkdir ${PATH_TO_COMPONENT}
if [ ! -d "${PATH_TO_COMPONENT}" ]; then
	echo !!!!!! ERROR: Cannot create component folder: "${PATH_TO_COMPONENT}". !!!!!!
	exit
fi

sed -e s/__templateClass/${CLASSNAME}/g -e s/__templateSelector/${SELECTORNAME}/g -e s/__template/${NAME}/g <"${PATH_TO_TMPL}/__template.ts" > "${PATH_TO_COMPONENT}/${NAME}.ts"
sed s/__template/${NAME}/ <"${PATH_TO_TMPL}/__template.scss" > "${PATH_TO_COMPONENT}/${NAME}.scss"
sed s/__template/${NAME}/ <"${PATH_TO_TMPL}/__template.jade" > "${PATH_TO_COMPONENT}/${NAME}.jade"


echo ====== Successfully created component: "${NAME}" ====== 