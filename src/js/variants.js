(async()=>{
	const 	icons=await(await fetch(`../json/icons.json`)).json(),
		light=await(await fetch(`../json/light.json`)).json(),
		exclusions=await(await fetch(`../json/variants.json`)).json(),
		body=document.querySelector(`tbody`),
		variants={
			solid:0,
			outline:0,
			round:0,
			sharp:0,
			light:0
		},
		types=Object.keys(variants),
		counters=document.querySelectorAll(`tfoot td`);
	let exclude,key,path,svg,tr,td,use;
	counters[0].firstChild.nodeValue=Object.keys(exclusions).length;
	for(key in exclusions)
		if(exclusions.hasOwnProperty(key)){
			tr=tr?tr.cloneNode(0):document.createElement(`tr`);
			if(td)
				td=td.cloneNode(0);
			else{
				td=document.createElement(`td`);
				td.classList.add(`oh`,`toe`,`wsnw`);
			}
			td.append(document.createTextNode(key));
			tr.append(td);
			td=td.cloneNode(0);
			if(svg){
				svg=svg.cloneNode(0);
				svg.classList.remove(`complete`,`exclude`,`missing`);
				path=path.cloneNode(0);
			}else{
				svg=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`),
				path=document.createElementNS(`http://www.w3.org/2000/svg`,`path`),
				svg.classList.add(`vam`);
				svg.setAttribute(`viewBox`,`0 0 24 24`);
			}
			if(icons.hasOwnProperty(key)){
				tr.classList.toggle(`google`,icons[key].contributor===`google`);
				++variants.solid;
				path.setAttribute(`d`,icons[key].data);
				svg.append(path);
			}else{
				exclude=exclusions[key].includes(`solid`);
				svg.classList.toggle(`exclude`,exclude);
				svg.classList.toggle(`missing`,!exclude);
				use=use?use.cloneNode(0):document.createElementNS(`http://www.w3.org/2000/svg`,`use`);
				use.setAttribute(`href`,exclude?`#cancel`:`#close-circle`);
				svg.append(use);
			}
			td.append(svg);
			tr.append(td);
			td=td.cloneNode(0);
			svg=svg.cloneNode(0);
			svg.classList.remove(`complete`,`exclude`,`missing`);
			if(icons.hasOwnProperty(key+`-outline`)){
				tr.classList.toggle(`google`,!icons[key]&&icons[key+`-outline`].contributor===`google`);
				++variants.outline;
				path=path.cloneNode(0);
				path.setAttribute(`d`,icons[key+`-outline`].data);
				svg.append(path);
			}else{
				exclude=exclusions[key].includes(`outline`);
				svg.classList.toggle(`exclude`,exclude);
				svg.classList.toggle(`missing`,!exclude);
				use=use?use.cloneNode(0):document.createElementNS(`http://www.w3.org/2000/svg`,`use`);
				use.setAttribute(`href`,exclude?`#cancel`:`#close-circle`);
				svg.append(use);
			}
			td.append(svg);
			tr.append(td);
	/*		types.forEach(type=>{
				if(variants.hasOwnProperty(type)&&type!==`solid`&&type!==`light`){
					td=td.cloneNode(0);
					svg=svg.cloneNode(0);
					svg.classList.remove(`exclude`,`missing`);
					if(icons.hasOwnProperty(key+`-`+type)){
						tr.classList.toggle(`google`,icons[key+`-`+type].contributor===`google`);
						++variants[type];
						path=path.cloneNode(0);
						path.setAttribute(`d`,icons[key+`-`+type].data);
						svg.append(path);
					}else{
						exclude=exclusions[key].includes(type);
						svg.classList.toggle(`exclude`,exclude);
						svg.classList.toggle(`missing`,!exclude);
						use=use?use.cloneNode(0):document.createElementNS(`http://www.w3.org/2000/svg`,`use`);
						use.setAttribute(`href`,exclude?`#cancel`:`#close-circle`);
						svg.append(use);
					}
					td.append(svg);
					tr.append(td);
				}
			});*/
			td=td.cloneNode(0);
			svg=svg.cloneNode(0);
			svg.classList.remove(`complete`,`exclude`,`missing`);
			if(light.hasOwnProperty(key)){
				++variants.light;
				svg.classList.add(`complete`);
				use=use?use.cloneNode(0):document.createElementNS(`http://www.w3.org/2000/svg`,`use`);
				use.setAttribute(`href`,`#check`);
				svg.append(use);
			}else{
				exclude=exclusions[key].includes(`light`);
				svg.classList.toggle(`exclude`,exclude);
				svg.classList.toggle(`missing`,!exclude);
				use=use?use.cloneNode(0):document.createElementNS(`http://www.w3.org/2000/svg`,`use`);
				use.setAttribute(`href`,exclude?`#cancel`:`#close-circle`);
				svg.append(use);
			}
			td.append(svg);
			tr.append(td);
			body.appendChild(tr);
		}
	counters[1].firstChild.nodeValue=variants.solid;
	counters[2].firstChild.nodeValue=variants.outline;
	counters[3].firstChild.nodeValue=variants.light;
/*	types.forEach((type,index)=>{
		if(variants.hasOwnProperty(type))
			counters[++index].firstChild.nodeValue=variants[type];
	});*/
})();