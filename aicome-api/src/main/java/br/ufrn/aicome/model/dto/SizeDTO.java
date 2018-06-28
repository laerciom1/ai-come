package br.ufrn.aicome.model.dto;

import br.ufrn.aicome.model.Size;

public class SizeDTO {

    private Integer id;

    private String name;

    private String identifier;

    public SizeDTO(Size size) {
        setId(size.getId());
        setName(size.getName());
        setIdentifier(size.getIdentifier());
    }

    public Size toSize(){
        Size size = new Size();
        size.setId(getId());
        size.setName(getName());
        size.setIdentifier(getIdentifier());
        return size;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }
}
