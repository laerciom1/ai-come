package br.ufrn.aicome.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="taste")
public class Taste extends AbstractModel<Integer> {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	@Column(name="id")
	private Integer id;

	@Column(name="name")
	private String name;

	@Column(name="description")
	private String description;

	@Column(name="s_value")
	private Double sValue;

	@Column(name="m_value")
	private Double mValue;

	@Column(name="l_value")
	private Double lValue;

	@Column(name="xl_value")
	private Double xlValue;

	@ManyToOne
	@JoinColumn(name="store_id")
	private Store store;

	@Override
	public Integer getId() {
		return id;
	}

	@Override
	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getsValue() {
		return sValue;
	}

	public void setsValue(Double sValue) {
		this.sValue = sValue;
	}

	public Double getmValue() {
		return mValue;
	}

	public void setmValue(Double mValue) {
		this.mValue = mValue;
	}

	public Double getlValue() {
		return lValue;
	}

	public void setlValue(Double lValue) {
		this.lValue = lValue;
	}

	public Double getXlValue() {
		return xlValue;
	}

	public void setXlValue(Double xlValue) {
		this.xlValue = xlValue;
	}

	public Store getStore() {
		return store;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
